import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import env from "../../config/env.js";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const encodedEmail = encodeURIComponent(email);
      const encodedPassword = encodeURIComponent(newPassword);
      const response = await axios.put(
        `${env.BE_API_PATH}/Auth/forgot-password/${encodedEmail}?newPassword=${encodedPassword}`
      );
      if (response.status === 200) {
        toast.success(response.data.message || "Đổi mật khẩu thành công");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.Message || "Có lỗi xảy ra khi đổi mật khẩu"
      );
    }
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-blue-100 to-blue-300 space-y-6">
      <div className="border shadow-lg rounded-lg p-4 sm:p-6 w-full max-w-md bg-white">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-blue-600">
          Quên mật khẩu
        </h2>
        <form
          className="rounded-lg border border-gray-200 p-4 sm:p-6"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Nhập email
            </label>
            <input
              type="email"
              name="email"
              placeholder="abc@gmail.com"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Nhập mật khẩu mới
            </label>
            <input
              name="password"
              type="password"
              placeholder="*********"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 mt-8">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Đổi mật khẩu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
