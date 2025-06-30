import React, { useEffect, useState } from "react";
import {
  getAllUsers,
  getAllDevices,
  getAttendancesList,
  getAllStudents,
  getAllLecturers,
  getDefaultUsers,
  getAllPermissions,
} from "../../../utils/AdminHelper";
import UserChart from "./UserChart";
import DeviceChart from "./DeviceChart";
import PermissionHeatmap from "./PermissionHeatmap.jsx";
import "react-calendar-heatmap/dist/styles.css";
import "./AdminSummaryHeatMap.css";

const AdminSummary = () => {
  // User chart state
  const [studentCount, setStudentCount] = useState(0);
  const [lecturerCount, setLecturerCount] = useState(0);
  const [defaultUserCount, setDefaultUserCount] = useState(0);

  // Device chart state
  const [activeDeviceCount, setActiveDeviceCount] = useState(0);
  const [inactiveDeviceCount, setInactiveDeviceCount] = useState(0);

  // Permission chart state
  const [permissionChartData, setPermissionChartData] = useState([]);

  // Tổng số lượng
  const [userCount, setUserCount] = useState(0);
  const [deviceCount, setDeviceCount] = useState(0);
  const [attendanceCount, setAttendanceCount] = useState(0);
  const [permissionCount, setPermissionCount] = useState(0);

  // Tooltip state
  const [tooltip, setTooltip] = useState({ show: false, content: '', x: 0, y: 0 });

  // Format date to Vietnamese
  const formatDateVN = (dateString) => {
    const date = new Date(dateString);
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString('vi-VN', options);
  };

  // Tháng/năm chọn để xem heatmap
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());

  useEffect(() => {
    const fetchData = async () => {
      // Gọi song song các API
      const [
        users,
        devices,
        attendances,
        permissions,
        students,
        lecturers,
        defaultUsers
      ] = await Promise.all([
        getAllUsers(),
        getAllDevices(1000, 0),
        getAttendancesList(),
        getAllPermissions(),
        getAllStudents(),
        getAllLecturers(),
        getDefaultUsers()
      ]);

      // Tổng số lượng
      setUserCount(users?.length || 0);
      setDeviceCount(devices?.length || 0);
      setAttendanceCount(attendances?.length || 0);
      setPermissionCount(permissions?.length || 0);

      // User chart
      setStudentCount(students?.length || 0);
      setLecturerCount(lecturers?.length || 0);
      setDefaultUserCount(defaultUsers?.length || 0);

      // Device chart
      const active = devices?.filter((d) => d.active)?.length || 0;
      const inactive = devices?.filter((d) => !d.active)?.length || 0;
      setActiveDeviceCount(active);
      setInactiveDeviceCount(inactive);

      // Permission chart
      if (permissions && Array.isArray(permissions)) {
        const dateMap = {};
        permissions.forEach((p) => {
          const date = new Date(p.createdAt).toLocaleDateString("vi-VN");
          dateMap[date] = (dateMap[date] || 0) + 1;
        });
        const chartData = Object.entries(dateMap).map(([date, count]) => ({
          date,
          count,
        }));
        setPermissionChartData(chartData);
      }
    };
    fetchData();
  }, []);

  // Chart data
  const userChartData = [
    { name: "Sinh viên", value: studentCount },
    { name: "Giảng viên", value: lecturerCount },
    { name: "Khác", value: defaultUserCount },
  ];

  const deviceChartData = [
    { name: "Đang hoạt động", value: activeDeviceCount },
    { name: "Không hoạt động", value: inactiveDeviceCount },
  ];

  // Calendar heatmap data
  const heatmapData = permissionChartData.map((item) => {
    const [day, month, year] = item.date.split("/");
    return {
      date: `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`,
      count: item.count,
    };
  });

  // Danh sách tháng/năm để chọn
  const months = [
    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
    "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
  ];
  const years = [];
  const currentYear = now.getFullYear();
  for (let y = currentYear - 2; y <= currentYear; y++) years.push(y);

  // Tính startDate và endDate theo tháng/năm đã chọn
  const startDate = new Date(selectedYear, selectedMonth, 1);
  const endDate = new Date(selectedYear, selectedMonth + 1, 0);

  // Lọc heatmapData chỉ lấy ngày trong tháng/năm đã chọn
  const filteredHeatmapData = heatmapData.filter(item => {
    const date = new Date(item.date);
    return (
      date.getFullYear() === selectedYear &&
      date.getMonth() === selectedMonth
    );
  });

  return (
    <div className="p-2 sm:p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-blue-700 text-center tracking-wide">
        Dashboard Tổng quát
      </h1>

      {/* Tổng số lượng */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-10">
        <div className="bg-white rounded-xl shadow-md flex flex-col items-center py-4 sm:py-6 border-t-4 border-blue-400">
          <h2 className="text-base sm:text-lg font-semibold text-gray-600 mb-1 sm:mb-2">
            Tổng số người dùng
          </h2>
          <p className="text-2xl sm:text-3xl font-bold text-blue-500">{userCount}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md flex flex-col items-center py-4 sm:py-6 border-t-4 border-green-400">
          <h2 className="text-base sm:text-lg font-semibold text-gray-600 mb-1 sm:mb-2">
            Tổng số thiết bị
          </h2>
          <p className="text-2xl sm:text-3xl font-bold text-green-500">{deviceCount}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md flex flex-col items-center py-4 sm:py-6 border-t-4 border-purple-400">
          <h2 className="text-base sm:text-lg font-semibold text-gray-600 mb-1 sm:mb-2">
            Tổng số điểm danh
          </h2>
          <p className="text-2xl sm:text-3xl font-bold text-purple-500">
            {attendanceCount}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md flex flex-col items-center py-4 sm:py-6 border-t-4 border-orange-400">
          <h2 className="text-base sm:text-lg font-semibold text-gray-600 mb-1 sm:mb-2">
            Tổng số phân quyền
          </h2>
          <p className="text-2xl sm:text-3xl font-bold text-orange-500">
            {permissionCount}
          </p>
        </div>
      </div>

      {/* Các chart: Người dùng & Thiết bị */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
        <UserChart
          data={userChartData}
          studentCount={studentCount}
          lecturerCount={lecturerCount}
          defaultUserCount={defaultUserCount}
        />
        <DeviceChart
          data={deviceChartData}
          activeDeviceCount={activeDeviceCount}
          inactiveDeviceCount={inactiveDeviceCount}
        />
      </div>

      {/* Chọn tháng/năm cho heatmap */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-8 sm:mt-10 mb-2 sm:mb-4">
        <select
          value={selectedMonth}
          onChange={e => setSelectedMonth(Number(e.target.value))}
          className="border rounded px-2 py-1"
        >
          {months.map((m, idx) => (
            <option key={idx} value={idx}>{m}</option>
          ))}
        </select>
        <select
          value={selectedYear}
          onChange={e => setSelectedYear(Number(e.target.value))}
          className="border rounded px-2 py-1"
        >
          {years.map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <span className="text-xs sm:text-sm text-gray-500">Xem lịch phân quyền theo tháng</span>
      </div>

      {/* Responsive heatmap */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[340px] max-w-3xl mx-auto">
          <PermissionHeatmap
            startDate={startDate}
            today={endDate}
            heatmapData={filteredHeatmapData}
            tooltip={tooltip}
            setTooltip={setTooltip}
            formatDateVN={formatDateVN}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;