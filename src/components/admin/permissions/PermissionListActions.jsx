import React from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { beInstance } from "../../../config/axios";
import ShowDeleteConfirm from "../../toast/ShowDeleteConfirm";

const PermissionListActions = ({ id, onPermissionRefresh }) => {
  const navigate = useNavigate();
  const role = sessionStorage.getItem("role");

  const handleDelete = async () => {
    try {
      await beInstance.delete(`/Permission/delete-permission/${id}`);
      toast.success("Xóa phân quyền thành công!");
      onPermissionRefresh();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Có lỗi xảy ra khi xóa phân quyền"
      );
    }
  };

  return (
    <div className="flex flex-wrap gap-2 sm:gap-4 justify-center">
      <button
        title="Xem chi tiết"
        className="border border-blue-600 text-blue-600 p-2 rounded-full hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out transform hover:scale-110 m-1 sm:m-2"
        onClick={() => navigate(`/${role}-dashboard/permissions/${id}`)}
      >
        <FaEye size={18} />
      </button>
      <ShowDeleteConfirm
        onConfirm={handleDelete}
        message="Bạn chắc chắn muốn xóa thông tin phân quyền này?"
        icon={<FaTrash size={18} />}
        buttonClassName="border border-red-600 text-red-600 p-2 rounded-full hover:bg-red-600 hover:text-white transition duration-300 ease-in-out transform hover:scale-110 m-1 sm:m-2"
      />
    </div>
  );
};

export default PermissionListActions;
