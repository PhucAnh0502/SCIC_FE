import React, { useEffect, useState } from "react";
import { getDefaultUsers } from "../../../utils/AdminHelper";
import { toast } from "react-toastify";
import { beInstance } from "../../../config/axios";
import Loading from "../../Loading.jsx";

const AddStudent = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [defaultUsers, setDefaultUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [studentCode, setStudentCode] = useState("");
  const [enrollDate, setEnrollDate] = useState("");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setEnrollDate(today);
  }, []);

  const fetchDefaultUsers = async () => {
    setLoading(true);
    try {
      const defaultUsers = await getDefaultUsers();
      setDefaultUsers(defaultUsers);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Không thể lấy dữ liệu người dùng"
      );
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
      const response = await beInstance.post(
        `/Admin/create-student/${selectedUserId}`,
        { studentCode, enrollDate }
      );
      toast.success(response.message || "Thêm sinh viên thành công");
      onClose();
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Đăng ký thất bại");
    }
  };

  if (loading) return <Loading />;

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md space-y-4 mt-10 sm:mt-16 md:mt-20"
    >
      <div className="relative flex items-center justify-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 text-center">
          Thêm sinh viên
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="absolute right-0 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>
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
        <label className="block text-sm font-medium mb-1">Mã sinh viên</label>
        <input
          type="text"
          value={studentCode}
          onChange={(e) => setStudentCode(e.target.value)}
          className="border rounded px-3 py-2 w-full text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Ngày đăng ký</label>
        <input
          type="date"
          value={enrollDate}
          disabled
          className="border rounded px-3 py-2 w-full bg-gray-100 text-gray-700 text-sm"
        />
      </div>

      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Hủy
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Thêm sinh viên
        </button>
      </div>
    </form>
  );
};

export default AddStudent;
