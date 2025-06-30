import React, { useEffect, useState } from "react";
import {
  getAllDevices,
  getAllLecturers,
  getAllStudents,
} from "../../../utils/AdminHelper";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import env from "../../../config/env";
import { getBeToken } from "../../../config/token";

const AddAttendance = () => {
  const navigate = useNavigate();

  const [devices, setDevices] = useState([]);
  const [students, setStudents] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [formData, setFormData] = useState({
    lecturerId: "",
    studentIds: [],
    deviceId: "",
    timeStart: "",
    timeEnd: "",
  });

  const fetchData = async () => {
    const [devices, students, lecturers] = await Promise.all([
      getAllDevices(99, 0),
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${env.BE_API_PATH}/Attendance/create-attendance`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${getBeToken()}`,
          },
        }
      );
      if (response.status === 200) {
        alert("Tạo danh sách điêm danh thành công!");
        navigate("/admin-dashboard/attendances");
      }
    } catch (error) {
      alert(
        error?.response?.data?.message || "Có lỗi khi thêm danh sách điểm danh"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md space-y-4 mt-10 sm:mt-16 md:mt-20"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6 gap-2">
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
        <h2 className="text-xl sm:text-2xl font-bold text-center text-blue-600 flex-1">
          Thêm điểm danh
        </h2>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Chọn giảng viên</label>
        <select
          value={formData.lecturerId}
          onChange={(e) =>
            setFormData({ ...formData, lecturerId: e.target.value })
          }
          className="border rounded px-3 py-2 w-full text-sm"
          required
        >
          <option value="" key="default-lecturer">
            -- Chọn --
          </option>
          {lecturers.map((lecturer) => (
            <option key={lecturer.userId} value={lecturer.userId}>
              {lecturer.userName} ({lecturer.email})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Chọn sinh viên</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {formData.studentIds.map((id) => {
            const student = students.find((s) => s.userId === id);
            if (!student) return null;
            return (
              <div
                key={id}
                className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {student.userName}
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      studentIds: formData.studentIds.filter(
                        (sid) => sid !== id
                      ),
                    })
                  }
                  className="ml-2 text-blue-500 hover:text-red-500"
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>
        <select
          onChange={(e) => {
            const selectedId = e.target.value;
            if (selectedId && !formData.studentIds.includes(selectedId)) {
              setFormData({
                ...formData,
                studentIds: [...formData.studentIds, selectedId],
              });
            }
            e.target.value = "";
          }}
          className="border rounded px-3 py-2 w-full text-sm"
        >
          <option value="" key="default-student">-- Chọn sinh viên --</option>
          {students
            .filter((student) => !formData.studentIds.includes(student.userId))
            .map((student) => (
              <option key={student.userId} value={student.userId}>
                {student.userName} ({student.email})
              </option>
            ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Chọn thiết bị</label>
        <select
          value={formData.deviceId}
          onChange={(e) =>
            setFormData({ ...formData, deviceId: e.target.value })
          }
          className="border rounded px-3 py-2 w-full text-sm"
          required
        >
          <option value="" key="default-device">
            -- Chọn --
          </option>
          {devices.map((device) => (
            <option key={device.id.id} value={device.id.id}>
              {device.label || "(N/A)"}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-10 flex-wrap">
        <div className="w-full sm:w-1/2">
          <label className="block text-sm font-medium">Ngày bắt đầu</label>
          <input
            type="date"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            value={formData.timeStart}
            onChange={(e) =>
              setFormData({ ...formData, timeStart: e.target.value })
            }
          />
        </div>

        <div className="w-full sm:w-1/2">
          <label className="block text-sm font-medium">Ngày kết thúc</label>
          <input
            type="date"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            value={formData.timeEnd}
            onChange={(e) =>
              setFormData({ ...formData, timeEnd: e.target.value })
            }
            min={formData.timeStart}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-base font-semibold"
        >
          Lập lịch điểm danh
        </button>
      </div>
    </form>
  );
};

export default AddAttendance;