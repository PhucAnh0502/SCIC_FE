import React, { useState } from "react";
import { toast } from "react-toastify";
import { beInstance } from "../../../config/axios";
import { convertToBase64 } from "../../../utils/ImageHelper";

const AddUser = ({ onClose, onUserRefresh }) => {
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
  const [loading, setLoading] = useState(false);

  const [facePreview, setFacePreview] = useState(null);
  const [fingerPreview, setFingerPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      if (name === "faceImage") setFacePreview(URL.createObjectURL(files[0]));
      if (name === "fingerprintImage") setFingerPreview(URL.createObjectURL(files[0]));
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

    setLoading(true);
    try {
      const payload = {
        ...formData,
        faceImage: await convertToBase64(faceImage),
        fingerprintImage: await convertToBase64(fingerprintImage),
      };

      const res = await beInstance.post("/Admin/create-user", payload);
      toast.success(res.message || "Thêm người dùng thành công");

      if (onUserRefresh) onUserRefresh();
      if (onClose) onClose();
    } catch (err) {
      toast.error(err?.Message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-h-[80vh] overflow-y-auto">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { name: "userName", label: "Tên người dùng", placeholder: "Nhập tên người dùng", type: "text" },
            { name: "fullName", label: "Họ tên đầy đủ", placeholder: "Nhập họ tên", type: "text" },
            { name: "idNumber", label: "Số CCCD", placeholder: "Nhập số CCCD", type: "text" },
            { name: "email", label: "Email", placeholder: "Nhập email", type: "email" },
            { name: "password", label: "Mật khẩu", placeholder: "Nhập mật khẩu", type: "password" },
          ].map(({ name, label, placeholder, type }) => (
            <div key={name} className="flex flex-col">
              <label className="block text-gray-700 font-medium mb-1">{label}</label>
              <input
                type={type}
                name={name}
                placeholder={placeholder}
                required
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { name: "faceImage", label: "Ảnh khuôn mặt", preview: facePreview },
            { name: "fingerprintImage", label: "Ảnh vân tay", preview: fingerPreview },
          ].map(({ name, label, preview }) => (
            <div key={name} className="flex flex-col items-start">
              <label className="block text-gray-700 font-medium mb-1">{label}</label>
              <input
                name={name}
                type="file"
                accept="image/*"
                required
                onChange={handleChange}
                className="w-full text-sm mb-2"
              />
              {preview && (
                <img
                  src={preview}
                  alt={label}
                  className="w-24 h-24 object-cover rounded-lg border"
                />
              )}
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex justify-center items-center`}
        >
          {loading ? "Đang thêm..." : "Thêm"}
        </button>
      </form>
    </div>
  );
};

export default AddUser;
