import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import env from "../../config/env.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { loginToTB } from "../../utils/LoginToThingsBoard.jsx";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${env.BE_API_PATH}/Auth/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, id, roles } = response.data;
        const role = roles?.$values?.[0]?.toLowerCase();

        if (!role) {
          toast.error("Không xác định vai trò người dùng.");
          return;
        }

        sessionStorage.setItem("token", token);
        sessionStorage.setItem("userId", id);
        sessionStorage.setItem("role", role);

        const TBToken = await loginToTB();
        if (TBToken) {
          sessionStorage.setItem("TBToken", TBToken);
        }

        await login();

        navigate(`/${role}-dashboard`);
      }
    } catch (err) {
      console.log(err);
      toast.error(
        err?.response?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại."
      );
    }
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-blue-100 to-blue-300 space-y-6">
      <h2 className="font-sevillana text-4xl text-white drop-shadow-md">
        Hệ thống quản lý vào ra
      </h2>
      <div className="border shadow-lg rounded-lg p-4 sm:p-6 w-full max-w-md bg-white">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-blue-600">
          Đăng nhập
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
              Nhập mật khẩu
            </label>
            <input
              name="password"
              type="password"
              placeholder="*********"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 flex items-center justify-between">
            <a href="./register" className="text-blue-600 hover:text-blue-800">
              Đăng ký
            </a>

            <a
              href="./forgot-password"
              className="text-blue-600 hover:text-blue-800"
            >
              Quên mật khẩu?
            </a>
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
