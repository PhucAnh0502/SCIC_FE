import React, { useState, useEffect } from "react";
import { getAllLecturers } from "../../../utils/AdminHelper";
import DataTable from "react-data-table-component";
import { columns } from "./LecturerColumn";
import { useNavigate } from "react-router-dom";
import LecturerListFilters from "./LecturerListFilters";
import LecturerListActions from "./LecturerListActions";
import { toast } from "react-toastify";

const LecturerList = () => {
  const navigate = useNavigate();

  const [lecturers, setLecturers] = useState([]);
  const [filteredLecturers, setFilteredLecturers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const onLecturerRefresh = () => {
    fetchLecturers();
  };

  useEffect(() => {
    fetchLecturers();
  }, []);

  const fetchLecturers = async () => {
    setLoading(true);
    try {
      const lecturers = await getAllLecturers();
      if (lecturers) {
        let sno = 1;
        const data = lecturers.map((lecturer) => ({
          id: lecturer.userId,
          sno: sno++,
          userName: lecturer.userName || "N/A",
          lecturerCode: lecturer.lecturerCode || "N/A",
          email: lecturer.email || "N/A",
          hireDate: new Date(lecturer.hireDate).toLocaleDateString("vi-VN"),
          action: (
            <LecturerListActions
              id={lecturer.userId}
              onlecturerRefresh={onLecturerRefresh}
            />
          ),
        }));
        setLecturers(data);
        setFilteredLecturers(data);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Không thể lấy dữ liệu giảng viên");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleAddLecturer = () => {
    navigate(`/admin-dashboard/lecturers/add-lecturer`);
  };

  const filterLecturers = (search) => {
    const data = lecturers.filter((lecturer) => {
      const matchesSearch =
        lecturer.userName.toLowerCase().includes(search.toLowerCase()) ||
        lecturer.lecturerCode.toLowerCase().includes(search.toLowerCase());
      return matchesSearch;
    });
    setFilteredLecturers(data);
  };

  useEffect(() => {
    filterLecturers(searchText);
  }, [searchText]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 rounded-full animate-spin border-t-transparent mb-4"></div>
          <p className="text-lg font-semibold text-blue-500 animate-pulse">
            Loading...
          </p>
        </div>
      </div>
    );

  return (
    <div className="p-2 sm:p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="text-center">
        <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-5">Quản lý giảng viên</h3>
      </div>

      <LecturerListFilters
        searchText={searchText}
        handleSearchChange={handleSearchChange}
        handleAddLecturer={handleAddLecturer}
      />

      <div className="mt-4 sm:mt-5 w-full overflow-x-auto">
        <div className="min-w-[600px]">
          <DataTable columns={columns} data={filteredLecturers} pagination responsive highlightOnHover striped />
        </div>
      </div>
    </div>
  );
};

export default LecturerList;
