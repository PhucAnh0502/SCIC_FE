import React, { useState } from "react";
import axios from "axios";
import env from "../../../config/env.js";
import { getBeToken } from "../../../config/token.js";
import { toast } from "react-toastify";

const UserUpdateForm = ({ user, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: user.userName || "",
    email: user.email || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${env.BE_API_PATH}/Admin/update-user/${user.id}`, formData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getBeToken()}`,
        },
      });
      onSuccess(response.data);
    } catch (err) {
      toast.error(err?.response?.data?.Message || "Cập nhật thất bại");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Cập nhật thông tin người dùng</h2>
      <div>
        <label className="block font-medium mb-1 text-sm sm:text-base">Tên đăng nhập</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded text-sm sm:text-base"
        />
      </div>
      <div>
        <label className="block font-medium mb-1 text-sm sm:text-base">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded text-sm sm:text-base"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button
          type="submit"
          className="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm sm:text-base"
        >
          Lưu
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="w-full sm:w-auto bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 text-sm sm:text-base"
        >
          Hủy
        </button>
      </div>
    </form>
  );
};

export default UserUpdateForm;
