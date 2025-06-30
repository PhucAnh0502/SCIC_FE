import React, { useEffect, useState } from "react";
import { getDefaultUsers } from "../../../utils/AdminHelper";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import env from "../../../config/env.js";
import { getBeToken } from "../../../config/token.js";

const AddLecturer = () => {
  const [loading, setLoading] = useState(false);
  const [defaultUsers, setDefaultUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [lecturerCode, setLecturerCode] = useState("");
  const [hireDate, setHireDate] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; 
    setHireDate(today);
  }, []);

  const fetchDefaultUsers = async () => {
    setLoading(true);
    try {
      const defaultUsers = await getDefaultUsers();
      setDefaultUsers(defaultUsers);
    } catch (err) {
      alert(err.response?.data?.message || "Không thể lấy dữ liệu người dùng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDefaultUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${env.BE_API_PATH}/Admin/create-student/${selectedUserId}`,
        {
          lecturerCode,
          hireDate,
        },
        {
          headers: {
            Authorization: `Bearer ${getBeToken()}`,
          },
        }
      );
      if (response) {
        alert(response.data.message);
        navigate(-1);
      }
    } catch (error) {
      alert(error.response?.data?.Message || "Đăng ký thất bại");
    }
  };

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
          Thêm giảng viên
        </h2>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Chọn người dùng</label>
        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          className="border rounded px-3 py-2 w-full text-sm"
          required
        >
          <option value="">-- Chọn --</option>
          {defaultUsers.map((user) => (
            <option key={user.id} value={user.id}>
              {user.fullName} ({user.email})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Mã giảng viên</label>
        <input
          type="text"
          value={lecturerCode}
          onChange={(e) => setLecturerCode(e.target.value)}
          className="border rounded px-3 py-2 w-full text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Ngày đăng ký</label>
        <input
          type="date"
          value={hireDate}
          disabled
          className="border rounded px-3 py-2 w-full bg-gray-100 text-gray-700 text-sm"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-base font-semibold"
      >
        Thêm giảng viên
      </button>
    </form>
  );
};

export default AddLecturer;
