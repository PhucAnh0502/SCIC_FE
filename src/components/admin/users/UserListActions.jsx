import React from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import ShowDeleteConfirm from "../../toast/ShowDeleteConfirm";
import { beInstance } from "../../../config/axios";

const UserListActions = ({ id, onUserRefresh, handleViewUser }) => {

  const handleDelete = async () => {
    if (!id) {
      toast.error("ID người dùng không hợp lệ.");
      return;
    }

    try {
      const res = await beInstance.delete(`/Admin/delete-user/${id}`);
      toast.success(res.data?.message || "Xóa người dùng thành công!");
      onUserRefresh();
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Có lỗi xảy ra khi xóa người dùng."
      );
    }
  };

  return (
    <div className="flex flex-wrap gap-2 sm:gap-4 justify-center">
      <button
        title="Xem chi tiết"
        onClick={() => handleViewUser(id)}
        className="border border-blue-600 text-blue-600 p-2 rounded-full hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out transform hover:scale-110 m-1 sm:m-2"
      >
        <FaEye size={18} />
      </button>

      <ShowDeleteConfirm
        onConfirm={handleDelete}
        message="Bạn chắc chắn muốn xóa người dùng này?"
        icon={<FaTrash size={18} />}
        buttonClassName="border border-red-600 text-red-600 p-2 rounded-full hover:bg-red-600 hover:text-white transition duration-300 ease-in-out transform hover:scale-110 m-1 sm:m-2"
      />
    </div>
  );
};

export default UserListActions;
