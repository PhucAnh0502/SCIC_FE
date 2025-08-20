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
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="border shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-md bg-white/95 backdrop-blur-md">
        {/* Header với nút Back */}
        <div className="relative mb-6 flex items-center justify-center">
          <button
            type="button"
            onClick={() => navigate("/login")} // route quay lại màn hình login
            className="absolute left-0 flex items-center text-blue-600 hover:text-blue-800 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <h2 className="text-2xl sm:text-3xl font-semibold text-blue-600">
            Quên mật khẩu
          </h2>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-blue-600 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="abc@gmail.com"
              className="w-full px-4 py-2 border border-blue-200 rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white/80"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-blue-600 font-medium mb-2"
            >
              Mật khẩu mới
            </label>
            <input
              name="password"
              type="password"
              placeholder="*********"
              className="w-full px-4 py-2 border border-blue-200 rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white/80"
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg 
          hover:bg-blue-700 transition-all duration-300 font-medium"
          >
            Đổi mật khẩu
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
