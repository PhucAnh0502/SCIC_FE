import { beInstance } from "../../../config/axios.js";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AttendanceInfo from "./AttendanceInfo";
import UpdateAttendanceForm from "./UpdateAttendanceForm";
import {
  getAllLecturers,
  getAllStudents,
  getAllDevices,
  getDeviceById,
} from "../../../utils/AdminHelper";
import { toast } from "react-toastify";

const AttendanceDetail = () => {
  const { attendanceId } = useParams();
  const navigate = useNavigate();

  const [deviceInfo, setDeviceInfo] = useState({});
  const [devices, setDevices] = useState([]);
  const [students, setStudents] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [attendanceInfo, setAttendanceInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const fetchData = async () => {
    const [devices, students, lecturers] = await Promise.all([
      getAllDevices(99, 0), //Please check params in AdminHelper.jsx
      getAllStudents(),
      getAllLecturers(),
    ]);
    setDevices(devices);
    setStudents(students);
    setLecturers(lecturers);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchAttendanceInfo = async () => {
    setLoading(true);
    try {
      const response = await beInstance.get(
        `/Attendance/attendance/${attendanceId}`
      );

      const info = response;
      setAttendanceInfo(info);
      const data = await getDeviceById(info.deviceId);
      if (data) {
        setDeviceInfo(data);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "không thể lấy thông tin điểm danh"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendanceInfo();
  }, [attendanceId]);

  const handleUpdateSuccess = (updatedAttendance) => {
    setAttendanceInfo(updatedAttendance);
    setEditMode(false);
    fetchAttendanceInfo();
    toast.success("Cập nhật thông tin điểm danh thành công!");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 rounded-full animate-spin border-t-transparent mb-4"></div>
          <p className="text-lg font-semibold text-blue-500 animate-pulse">
            Đang tải...
          </p>
        </div>
      </div>
    );

  return (
    <div className="p-2 sm:p-4 md:p-6 max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition text-sm sm:text-base"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="hidden xs:inline">Quay lại</span>
        </button>
        {!editMode && (
          <button
            onClick={() => setEditMode(true)}
            className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm sm:text-base"
          >
            Chỉnh sửa
          </button>
        )}
      </div>

      {editMode ? (
        <UpdateAttendanceForm
          attendance={attendanceInfo}
          onSuccess={handleUpdateSuccess}
          onCancel={() => setEditMode(false)}
          lecturers={lecturers}
          students={students}
          devices={devices}
        />
      ) : (
        <AttendanceInfo
          attendanceInfo={attendanceInfo}
          deviceInfo={deviceInfo}
          setAttendanceInfo={setAttendanceInfo}
        />
      )}
    </div>
  );
};

export default AttendanceDetail;
