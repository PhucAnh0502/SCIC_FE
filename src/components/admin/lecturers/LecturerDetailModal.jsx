import React, { useState, useEffect } from "react";
import { beInstance } from "../../../config/axios";
import { toast } from "react-toastify";
import Loading from "../../Loading";

const LecturerDetailModal = ({ userId, onClose, onUpdated }) => {
  const [lecturer, setLecturer] = useState(null);
  const [lecturerCode, setLecturerCode] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchLecturer = async () => {
    setLoading(true);
    try {
      const response = await beInstance.get(`/Lecturer/lecturer/${userId}`);
      setLecturer(response);
      setLecturerCode(response.lecturerCode || "");
    } catch (err) {
      toast.error(err?.response?.data?.Message || "Không thể lấy dữ liệu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchLecturer();
    }
  }, [userId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await beInstance.put(`/Admin/update-lecturer/${lecturer.userId}`, {
        newLecturereCode: lecturerCode,
      });
      toast.success("Cập nhật thông tin giảng viên thành công!");
      if (onUpdated) onUpdated();
      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.Message || "Cập nhật thất bại");
    }
  };

  if (loading || !lecturer) return <Loading />;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative overflow-y-auto max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        {/* nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>

        <h2 className="text-xl font-bold text-blue-600 mb-4 text-center">
          Thông tin giảng viên
        </h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          {/* Tên đăng nhập */}
          <div>
            <label className="block font-medium mb-1">Tên đăng nhập</label>
            <input
              type="text"
              value={lecturer.userName || ""}
              disabled
              className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="text"
              value={lecturer.email || ""}
              disabled
              className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Mã giảng viên (có thể chỉnh sửa) */}
          <div>
            <label className="block font-medium mb-1">Mã giảng viên</label>
            <input
              type="text"
              value={lecturerCode}
              onChange={(e) => setLecturerCode(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Ngày đăng ký */}
          <div>
            <label className="block font-medium mb-1">Ngày đăng ký</label>
            <input
              type="text"
              value={
                lecturer?.hireDate
                  ? new Date(lecturer.hireDate).toLocaleDateString("vi-VN")
                  : "N/A"
              }
              disabled
              className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Ảnh khuôn mặt */}
          <div className="text-center">
            <p className="font-medium text-gray-700 mb-2">Ảnh khuôn mặt</p>
            <img
              src={lecturer?.faceImage || "/images/faceImage.jpg"}
              alt="Ảnh khuôn mặt"
              className="w-40 h-40 object-cover rounded-md border mx-auto"
            />
          </div>

          {/* nút hành động */}
          <div className="flex gap-3 justify-end pt-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Cập nhật
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LecturerDetailModal;
