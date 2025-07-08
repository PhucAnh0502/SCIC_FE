import React, { useState } from "react";
import { toast } from "react-toastify";
import { beInstance } from "../../../config/axios";

const StudentUpdateForm = ({ student, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    studentCode: student.studentCode || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, studentCode: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await beInstance.put(
        `/Admin/update-student/${student.userId}`,
        formData
      );
      toast.success(response.data?.message || "Cập nhật thành công");
      onSuccess(response.data);
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
        err?.response?.data?.Message ||
        "Cập nhật thất bại"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Cập nhật thông tin sinh viên</h2>

      <div>
        <label className="block font-medium mb-1 text-sm sm:text-base">
          Mã số sinh viên mới
        </label>
        <input
          type="text"
          name="studentCode"
          value={formData.studentCode}
          onChange={handleChange}
          className="w-full border p-2 rounded text-sm sm:text-base"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button
          type="submit"
          className="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm sm:text-base"
        >
          Lưu
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="w-full sm:w-auto bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 text-sm sm:text-base"
        >
          Hủy
        </button>
      </div>
    </form>
  );
};

export default StudentUpdateForm;
