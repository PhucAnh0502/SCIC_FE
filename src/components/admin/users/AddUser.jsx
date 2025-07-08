import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { beInstance } from "../../../config/axios";
import { convertToBase64 } from "../../../utils/ImageHelper";

const AddUser = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    fullName: "",
    idNumber: "",
    email: "",
    password: "",
    faceImage: null,
    fingerprintImage: null,
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const { faceImage, fingerprintImage } = formData;
    if (!faceImage || !fingerprintImage) {
      return setError("Vui lòng chọn ảnh khuôn mặt và ảnh vân tay.");
    }

    try {
      const payload = {
        ...formData,
        faceImage: await convertToBase64(faceImage),
        fingerprintImage: await convertToBase64(fingerprintImage),
      };

      const res = await beInstance.post("/Admin/create-user", payload);
      toast.success(res.message || "Thêm người dùng thành công");
      setTimeout(() => navigate(-1), 1500);
    } catch (err) {
      toast.error(
        err?.Message ||
        "Đăng ký thất bại"
      );
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
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden xs:inline">Quay lại</span>
          </button>
          <h2 className="text-xl sm:text-2xl font-bold text-center text-blue-600 flex-1">
            Thêm người dùng
          </h2>
        </div>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {[
            { name: "userName", label: "Tên người dùng", type: "text" },
            { name: "fullName", label: "Họ tên đầy đủ", type: "text" },
            { name: "idNumber", label: "Số CCCD", type: "text" },
            { name: "email", label: "Email", type: "email" },
            { name: "password", label: "Mật khẩu", type: "password" },
          ].map(({ name, label, type }) => (
            <div key={name}>
              <label className="block text-gray-700 font-medium mb-1">
                {label}
              </label>
              <input
                type={type}
                name={name}
                required
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          {[
            { name: "faceImage", label: "Ảnh khuôn mặt" },
            { name: "fingerprintImage", label: "Ảnh vân tay" },
          ].map(({ name, label }) => (
            <div key={name}>
              <label className="block text-gray-700 font-medium mb-1">
                {label}
              </label>
              <input
                name={name}
                type="file"
                accept="image/*"
                required
                onChange={handleChange}
                className="w-full text-sm"
              />
            </div>
          ))}

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
