import React from "react";
import { beInstance } from "../../../config/axios.js";
import { FaEye, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import ShowDeleteConfirm from "../../toast/ShowDeleteConfirm";

const LecturerListActions = ({ id, onLecturerRefresh, onViewLecturer }) => {
  const handleDelete = async () => {
    try {
      await beInstance.delete(`/Admin/delete-leturer/${id}`);

      toast.success("Xóa giảng viên thành công!");
      onLecturerRefresh();
    } catch (err) {
      toast.error(err.response?.Message || "Có lỗi xảy ra khi xóa giảng viên");
    }
  };

  return (
    <div className="flex flex-wrap gap-2 sm:gap-4 justify-center">
      <button
        title="Xem chi tiết"
        className="border border-blue-600 text-blue-600 p-2 rounded-full hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out transform hover:scale-110 m-1 sm:m-2"
        onClick={() => onViewLecturer(id)}
      >
        <FaEye size={18} />
      </button>

      <ShowDeleteConfirm
        onConfirm={handleDelete}
        message="Bạn chắc chắn muốn xóa giảng viên này?"
        icon={<FaTrash size={18} />}
        buttonClassName="border border-red-600 text-red-600 p-2 rounded-full hover:bg-red-600 hover:text-white transition duration-300 ease-in-out transform hover:scale-110 m-1 sm:m-2"
      />
    </div>
  );
};

export default LecturerListActions;
