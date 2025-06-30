import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { convertToBase64 } from "../../../utils/ImageHelper";
import env from "../../../config/env.js"
import { getBeToken } from "../../../config/token.js";

const AddUser = () => {
  const [formData, setFormData] = useState({
    userName: "",
    fullName: "",
    idNumber: "",
    email: "",
    password: "",
    faceImage: "",
    fingerprintImage: "",
  });
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "faceImage" || name === "fingerprintImage") {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg("");

    if (!formData.faceImage || !formData.fingerprintImage) {
      setError("Vui lòng chọn ảnh khuôn mặt và ảnh vân tay.");
      return;
    }

    try {
      const faceBase64 = await convertToBase64(formData.faceImage);
      const fingerprintBase64 = await convertToBase64(
        formData.fingerprintImage
      );

      const payload = {
        userName: formData.userName,
        fullName: formData.fullName,
        idNumber: formData.idNumber,
        email: formData.email,
        password: formData.password,
        faceImage: faceBase64,
        fingerprintImage: fingerprintBase64,
      };
      console.log(payload);

      const response = await axios.post(
        `${env.BE_API_PATH}/Admin/create-user`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getBeToken()}`
          },
        }
      );

      if (response.status === 200) {
        setSuccessMsg("Đăng ký thành công!");
        setTimeout(() => navigate(-1), 2000);
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(err.response?.data.Message || "Đăng ký thất bại");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen justify-center space-y-6 bg-gray-50">
      <div className="border shadow-lg rounded-2xl p-4 sm:p-8 w-full max-w-md bg-white relative">
        <div className="flex items-center justify-between mb-6">
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
            Thêm người dùng
          </h2>
        </div>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {successMsg && (
          <p className="text-green-600 text-sm mb-2">{successMsg}</p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {[
            { label: "Tên người dùng", name: "userName", type: "text" },
            { label: "Họ tên đầy đủ", name: "fullName", type: "text" },
            { label: "Số CCCD", name: "idNumber", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Mật khẩu", name: "password", type: "password" },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="block text-gray-700 font-medium mb-1">
                {label}
              </label>
              <input
                type={type}
                name={name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Ảnh khuôn mặt
            </label>
            <input
              name="faceImage"
              type="file"
              accept="image/*"
              onChange={handleChange}
              required
              className="w-full text-sm"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Ảnh vân tay
            </label>
            <input
              name="fingerprintImage"
              type="file"
              accept="image/*"
              onChange={handleChange}
              required
              className="w-full text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Thêm
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
