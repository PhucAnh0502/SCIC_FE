import React, { useState } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import env from "../../config/env";
import { getBeToken } from "../../config/token.js";
import { toast } from "react-toastify";

const ChangePassword = ({ isOpen, onClose, userId }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Mật khẩu mới và xác nhận mật khẩu không khớp");
      return;
    }

    try {
      const response = await axios.put(
        `${env.BE_API_PATH}/Auth/change-password/${userId}?newPassword=${encodeURI(newPassword)}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getBeToken()}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message || "Đổi mật khẩu thành công");
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.Message || "Có lỗi xảy ra khi đổi mật khẩu"
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30" onClick={onClose}></div>

      {/* Modal */}
      <div
        className="relative bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md z-50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-xl font-bold text-blue-600">Đổi mật khẩu</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 transition"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Nhập mật khẩu mới
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="********"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Nhập lại mật khẩu mới
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="********"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Đổi mật khẩu
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
