import React, { useState, useEffect } from "react";
import { beInstance } from "../../../config/axios";
import { toast } from "react-toastify";
import Loading from "../../Loading";

const StudentDetailModal = ({ studentId, onClose, onUpdated }) => {
  const [student, setStudent] = useState(null);
  const [newStudentCode, setNewStudentCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true); // Thêm loading riêng cho fetch

  useEffect(() => {
    const fetchStudent = async () => {
      setFetchLoading(true);
      try {
        const res = await beInstance.get(`/Student/student/${studentId}`);
        setStudent(res);
        setNewStudentCode(res.studentCode || "");
      } catch (err) {
        console.error("Fetch student error:", err);
        toast.error(err.message || "Không thể tải thông tin sinh viên");
      } finally {
        setFetchLoading(false);
      }
    };
    
    if (studentId) {
      fetchStudent();
    }
  }, [studentId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await beInstance.put(
        `/Admin/update-student/${studentId}`,
        { newStudentCode }
      );
      toast.success(response.data?.message || "Cập nhật thành công!");
      onUpdated && onUpdated(response.data);
      onClose();
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          err?.response?.data?.Message ||
          "Cập nhật thất bại"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    const fetchStudent = async () => {
      setFetchLoading(true);
      try {
        const res = await beInstance.get(`/Student/student/${studentId}`);
        setStudent(res);
        setNewStudentCode(res.studentCode || "");
      } catch (err) {
        console.error("Retry fetch student error:", err);
        toast.error(err.message || "Không thể tải thông tin sinh viên");
      } finally {
        setFetchLoading(false);
      }
    };
    
    fetchStudent();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600">
            Chi tiết sinh viên
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✖
          </button>
        </div>

        {/* Content */}
        {fetchLoading ? (
          // Hiển thị loading bên trong modal
          <div className="flex justify-center items-center py-8">
            <Loading />
          </div>
        ) : !student ? (
          // Hiển thị error state với nút retry
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">
              Không thể tải thông tin sinh viên
            </p>
            <button
              onClick={handleRetry}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Thử lại
            </button>
          </div>
        ) : (
          // Hiển thị thông tin sinh viên
          <>
            <div className="space-y-3 text-sm sm:text-base">
              <div>
                <strong>Tên đăng nhập:</strong> {student.userName}
              </div>
              <div>
                <strong>Email:</strong> {student.email}
              </div>
              <div>
                <strong>Ngày đăng ký:</strong>{" "}
                {student?.enrollDate
                  ? new Date(student.enrollDate).toLocaleDateString("vi-VN")
                  : "N/A"}
              </div>

              <div>
                <label className="block font-medium mb-1">Mã số sinh viên</label>
                <input
                  type="text"
                  value={newStudentCode}
                  onChange={(e) => setNewStudentCode(e.target.value)}
                  className="w-full border rounded px-3 py-2 text-sm sm:text-base"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-6 my-4">
                <div className="text-center">
                  <p className="font-medium text-gray-700 mb-1">Ảnh khuôn mặt</p>
                  <img
                    src={
                      student?.faceImage ? student?.faceImage : "/images/faceImage.jpg"
                    }
                    alt="Ảnh khuôn mặt"
                    className="w-40 h-40 object-cover rounded-md border mx-auto"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleUpdate}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
              >
                {loading ? "Đang lưu..." : "Cập nhật"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentDetailModal;