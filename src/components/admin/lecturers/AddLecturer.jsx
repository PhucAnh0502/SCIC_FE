import React, { useEffect, useState } from "react";
import { getDefaultUsers } from "../../../utils/AdminHelper";
import { beInstance } from "../../../config/axios.js";
import { toast } from "react-toastify";
import Loading from "../../Loading.jsx";

const AddLecturer = ({onClose}) => {
  const [loading, setLoading] = useState(false);
  const [defaultUsers, setDefaultUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [lecturerCode, setLecturerCode] = useState("");
  const [hireDate, setHireDate] = useState("");

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
      toast.error(
        err.response?.data?.message || "Không thể lấy dữ liệu người dùng"
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
        `/Admin/create-lecturer/${selectedUserId}`,
        {
          lecturerCode,
          hireDate,
        }
      );

      if (response?.message) {
        toast.success(response.message);
        onClose()
      }
    } catch (error) {
      toast.error(error?.Message || "Đăng ký thất bại");
    }
  };

  if (loading)
    return (
      <Loading />
    );

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md space-y-4 mt-10 sm:mt-16 md:mt-20"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6 gap-2">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-blue-600 flex-1">
          Thêm giảng viên
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
        <label className="block text-sm font-medium mb-1">
          Chọn người dùng
        </label>
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
