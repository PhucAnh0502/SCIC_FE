import React, { useState, useEffect } from "react";
import { getAllStudents } from "../../../utils/AdminHelper";
import StudentListActions from "./StudentListAction";
import DataTable from "react-data-table-component";
import { columns } from "./StudentColumn";
import StudentListFilters from "./StudentListFilters";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../Loading";

const StudentList = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const onStudentRefresh = () => {
    fetchStudents();
  };

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const students = await getAllStudents();
      if (students) {
        let sno = 1;
        const data = students.map((student) => ({
          id: student.userId,
          sno: sno++,
          userName: student.userName || "N/A",
          studentCode: student.studentCode || "N/A",
          email: student.email || "N/A",
          enrollDate: new Date(student.enrollDate).toLocaleDateString("vi-VN"),
          action: (
            <StudentListActions
              id={student.userId}
              onStudentRefresh={onStudentRefresh}
            />
          ),
        }));
        setStudents(data);
        setFilteredStudents(data);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Không thể lấy dữ liệu sinh viên");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleAddStudent = () => {
    navigate(`/admin-dashboard/students/add-student`);
  };

  const filterStudents = (search) => {
    const data = students.filter((student) => {
      const matchesSearch =
        (student.fullName?.toLowerCase() || "").includes(search.toLowerCase()) ||
        (student.studentCode?.toLowerCase() || "").includes(search.toLowerCase());
      return matchesSearch;
    });
    setFilteredStudents(data);
  };

  useEffect(() => {
    filterStudents(searchText);
  }, [searchText]);

  if (loading)
    return (
      <Loading />
    );

  return (
    <div className="p-2 sm:p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="text-center">
        <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-5">Quản lý sinh viên</h3>
      </div>

      <div className="mb-4">
        <StudentListFilters
          searchText={searchText}
          handleSearchChange={handleSearchChange}
          handleAddStudent={handleAddStudent}
        />
      </div>

      <div className="mt-4 sm:mt-5 w-full overflow-x-auto">
        <div className="min-w-[600px]">
          <DataTable
            columns={columns}
            data={filteredStudents}
            pagination
            responsive
            highlightOnHover
            striped
            customStyles={{
              table: { style: { minWidth: "100%" } },
              rows: { style: { fontSize: "0.95rem" } },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentList;