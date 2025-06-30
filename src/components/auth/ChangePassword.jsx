import axios from "axios";
import React, { useState } from "react";
import env from "../../config/env";
import { useNavigate } from "react-router-dom";
import { getBeToken } from "../../config/token.js";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password must be the same");
      return
    }

    try {
      const response = await axios.put(
        `${
          env.BE_API_PATH
        }/Auth/change-password/${userId}?newPassword=${encodeURI(newPassword)}`,{},
        {
          headers: {
            Authorization: `Bearer ${getBeToken()}`,
          },
        }
      );
      if (response) {
        setMessage(response.data.message || "Đổi mật khẩu thành công");
        setTimeout(() => {
          navigate(-1)
        },2000)
      }
    } catch (error) {
      setError(
        error?.response?.data?.Message || "Có lỗi xảy ra khi đổi mật khẩu"
      );
    }
  };
  return (
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-blue-100 to-blue-300 space-y-6">
      <div className="border shadow-lg rounded-lg p-4 sm:p-6 w-full max-w-md bg-white">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-blue-600">
          Đổi mật khẩu
        </h2>
        {message && <p className="text-green-500">{message}</p>}
        {error && <p className="text-red-500">{error}</p>}
        <form
          className="rounded-lg border border-gray-200 p-4 sm:p-6"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Nhập mật khẩu mới
            </label>
            <input
              name="newPassword"
              type="password"
              placeholder="*********"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Nhập lại mật khẩu mới
            </label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="*********"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => setConfirmPassword(e.target.value)}
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

export default ChangePassword;
