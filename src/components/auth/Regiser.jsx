import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { convertToBase64 } from "../../utils/ImageHelper";
import env from "../../config/env.js";
import { toast } from "react-toastify";
import Webcam from "react-webcam";

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
  const [useWebcam, setUseWebcam] = useState(false);
  const webcamRef = useRef(null);
  const [capturedFaceImage, setCapturedFaceImage] = useState(null);
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
      const faceBase64 =
        typeof formData.faceImage === "string"
          ? formData.faceImage
          : await convertToBase64(formData.faceImage);

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
        `${env.BE_API_PATH}/Auth/register`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Đăng ký thành công!");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      toast.error(err.response?.data.message || "Đăng ký thất bại");
    }
  };

  return (
    <div className="flex flex-col items-center h-full justify-center bg-gradient-to-br from-blue-50 to-white p-6">
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
        <h2 className="font-semibold text-3xl sm:text-4xl text-blue-600 mt-2">
          Hệ thống quản lý vào ra
        </h2>
      </div>

      <div className="border shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-2xl bg-white/95 backdrop-blur-md">
        {/* Header của form */}
        <div className="relative mb-6 flex items-center justify-center">
          <button
            type="button"
            onClick={() => navigate(-1)}
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

          {/* Tiêu đề căn giữa */}
          <h2 className="text-2xl sm:text-3xl font-semibold text-blue-600">
            Đăng ký
          </h2>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Nhóm thông tin tài khoản */}
          <div>
            <h3 className="text-lg font-medium text-blue-500 mb-3">
              Thông tin tài khoản
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Tên người dùng", name: "userName", type: "text" },
                { label: "Email", name: "email", type: "email" },
                { label: "Mật khẩu", name: "password", type: "password" },
              ].map(({ label, name, type }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                  </label>
                  <input
                    type={type}
                    name={name}
                    placeholder={label}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Nhóm thông tin cá nhân */}
          <div>
            <h3 className="text-lg font-medium text-blue-500 mb-3">
              Thông tin cá nhân
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Họ tên đầy đủ", name: "fullName", type: "text" },
                { label: "Số CCCD", name: "idNumber", type: "text" },
              ].map(({ label, name, type }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                  </label>
                  <input
                    type={type}
                    name={name}
                    placeholder={label}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Nhóm sinh trắc học */}
          <div>
            <h3 className="text-lg font-medium text-blue-500 mb-3">
              Xác thực sinh trắc học
            </h3>

            {/* Ảnh khuôn mặt */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ảnh khuôn mặt
              </label>
              <div className="mb-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setUseWebcam(!useWebcam)}
                  className="text-sm text-blue-600 underline"
                >
                  {useWebcam ? "Tải ảnh từ file" : "Chụp ảnh bằng webcam"}
                </button>
              </div>

              {useWebcam ? (
                <>
                  {capturedFaceImage ? (
                    <img
                      src={capturedFaceImage}
                      alt="Captured face"
                      className="mb-2 rounded"
                    />
                  ) : (
                    <Webcam
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      width="100%"
                      className="mb-2 rounded"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      const imageSrc = webcamRef.current.getScreenshot();
                      setCapturedFaceImage(imageSrc);
                      setFormData((prevData) => ({
                        ...prevData,
                        faceImage: imageSrc,
                      }));
                    }}
                    className="text-white bg-green-600 px-3 py-1 rounded hover:bg-green-700 transition"
                  >
                    {capturedFaceImage ? "Chụp lại" : "Chụp ảnh"}
                  </button>
                </>
              ) : (
                <input
                  name="faceImage"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleChange(e)}
                  required={!capturedFaceImage}
                  className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 p-2"
                />
              )}
            </div>

            {/* Ảnh vân tay */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ảnh vân tay
              </label>
              <input
                name="fingerprintImage"
                type="file"
                accept="image/*"
                onChange={(e) => handleChange(e)}
                required
                className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 p-2"
              />
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 text-lg font-medium"
          >
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
