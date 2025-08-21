import React from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { beInstance } from "../../../config/axios";
import ShowDeleteConfirm from "../../toast/ShowDeleteConfirm";

const StudentListActions = ({ id, onStudentRefresh, onViewStudent }) => {

  const handleDelete = async () => {
    try {
      const response = await beInstance.delete(`/Admin/delete-student/${id}`);
      toast.success(response.data?.message || "Xóa sinh viên thành công!");
      onStudentRefresh();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        err.response?.data?.Message ||
        "Có lỗi xảy ra khi xóa sinh viên"
      );
    }
  };

  return (
    <div className="flex flex-wrap gap-2 sm:gap-4 justify-center">
      <button
        title="Xem chi tiết"
        className="border border-blue-600 text-blue-600 p-2 rounded-full hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out transform hover:scale-110 m-1 sm:m-2"
        onClick={() => onViewStudent(id)}
      >
        <FaEye size={18} />
      </button>

      <ShowDeleteConfirm
        onConfirm={handleDelete}
        message="Bạn chắc chắn muốn xóa sinh viên này?"
        icon={<FaTrash size={18} />}
        buttonClassName="border border-red-600 text-red-600 p-2 rounded-full hover:bg-red-600 hover:text-white transition duration-300 ease-in-out transform hover:scale-110 m-1 sm:m-2"
      />
    </div>
  );
};

export default StudentListActions;
