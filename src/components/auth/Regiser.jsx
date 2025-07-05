import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { convertToBase64 } from "../../utils/ImageHelper";
import env from "../../config/env.js";
import { toast } from "react-toastify";

function Register() {
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
      console.log(payload)

      const response = await axios.post(`${env.BE_API_PATH}/Auth/register`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        toast.success("Đăng ký thành công!");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      toast.error(err.response?.data.message || "Đăng ký thất bại");
    }
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-blue-200 to-blue-400 space-y-6">
      <div className="border shadow-lg rounded-lg p-4 sm:p-6 w-full max-w-md bg-white">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-blue-600">
          Đăng ký
        </h2>
        {error && <p className="text-red-500">{error}</p>}

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
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              onChange={(e) => handleChange(e)}
              required
              className="w-full"
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
              onChange={(e) => handleChange(e)}
              required
              className="w-full"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
