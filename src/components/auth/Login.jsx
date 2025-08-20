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
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-br from-blue-50 to-white space-y-6">
      <div className="text-center mb-8">
        <svg
          className="mx-auto h-12 w-12 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
          />
        </svg>
        <h2 className="font-semibold text-4xl text-blue-600">
          Hệ thống quản lý vào ra
        </h2>
      </div>

      <div className="border shadow-md rounded-lg p-4 sm:p-6 w-full max-w-md bg-white/90 backdrop-blur-sm">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-center text-blue-600">
          Đăng nhập
        </h2>
        <form className="rounded-lg p-4 sm:p-6" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-blue-600 font-medium mb-2"
            >
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="abc@gmail.com"
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white/80"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12l-4 4-4-4m8-4H8m12 0a2 2 0 012 2v8a2 2 0 
       01-2 2H6a2 2 0 01-2-2V10a2 2 0 012-2h12z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block text-blue-600 font-medium mb-2"
            >
              Mật khẩu
            </label>
            <div className="relative">
              <input
                name="password"
                type="password"
                placeholder="*********"
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white/80"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="mb-5 flex items-center justify-between">
            <a
              href="./register"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              Đăng ký
            </a>
            <a
              href="./forgot-password"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              Quên mật khẩu?
            </a>
          </div>
          <div className="mb-1">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-300"
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
