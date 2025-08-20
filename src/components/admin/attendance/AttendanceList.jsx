import React, { useEffect, useState } from "react";
import { getAttendancesList } from "../../../utils/AdminHelper";
import AttendanceListActions from "./AttendanceListActions";
import { columns } from "./AttendanceColumn";
import DataTable from "react-data-table-component";
import AttendanceListFilters from "./AttendanceListFilters";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../Loading";

const AttendanceList = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [attendanceList, setAttendanceList] = useState([]);
  const [filteredAttendanceList, setFilteredAttendanceList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");

  const onAttendanceRefresh = () => {
    fetchAttendanceList();
  };

  const fetchAttendanceList = async () => {
    setLoading(true);
    try {
      const attendanceList = await getAttendancesList();

      if (attendanceList) {
        let sno = 1;
        const data = attendanceList.map((attendance) => ({
          id: attendance.id,
          sno: sno++,
          lecturerUserName: attendance.lecturer.userName || "N/A",
          lecturerCode: attendance.lecturer.lecturerCode || "N/A",
          numOfStudents: attendance.student.$values.length || "N/A",
          timeStart: new Date(attendance.timeStart).toLocaleString("vi-VN"),
          timeEnd: new Date(attendance.timeEnd).toLocaleString("vi-VN"),
          createdAt: new Date(attendance.createdAt).toLocaleString("vi-VN"),
          action: (
            <AttendanceListActions
              id={attendance.id}
              onAttendanceRefresh={onAttendanceRefresh}
            />
          ),
        }));
        setAttendanceList(data);
        setFilteredAttendanceList(data);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.Message ||
          "Có lỗi xảy ra khi lấy thông tin điểm danh"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendanceList();
  }, []);

  const handleAddAttendance = () => {
    navigate(`/admin-dashboard/attendances/create-attendance`);
  };

  const filterAttendances = (search, sDate, eDate) => {
    const data = attendanceList.filter((attendance) => {
      const matchesSearch =
        attendance.lecturerUserName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        attendance.lecturerCode.toLowerCase().includes(search.toLowerCase());
      const matchesStartDate =
        sDate === "" ||
        new Date(attendance.timeStart).toLocaleString("vi-VN") >= sDate;
      const matchesEndDate =
        eDate === "" ||
        new Date(attendance.timeEnd).toLocaleString("vi-VN") <= eDate;
      return (
        matchesSearch &&
        matchesStartDate &&
        matchesEndDate
      );
    });
    setFilteredAttendanceList(data);
  };

  useEffect(() => {
    filterAttendances(searchText, filterStartDate, filterEndDate)
  },[searchText, filterStartDate, filterEndDate])

  if (loading)
    return (
      <Loading />
    );
  return (
    <div className="p-2 sm:p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="text-center">
        <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-5">Quản lý điểm danh</h3>
      </div>

      <AttendanceListFilters
        searchText={searchText}
        filterStartDate={filterStartDate}
        filterEndDate={filterEndDate}
        onSearchChange={(e) => setSearchText(e.target.value)}
        onStartDateChange={(e) => setFilterStartDate(e.target.value)}
        onEndDateChange={(e) => setFilterEndDate(e.target.value)}
        handleAddAttendance={handleAddAttendance}
      />

      <div className="mt-4 sm:mt-5 w-full overflow-x-auto">
        <div className="min-w-[700px]">
          <DataTable columns={columns} data={filteredAttendanceList} pagination responsive highlightOnHover striped />
        </div>
      </div>
    </div>
  );
};

export default AttendanceList;
