import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaTrash } from "react-icons/fa";
import env from "../../../config/env.js";
import { getBeToken } from "../../../config/token.js";
import { toast } from "react-toastify";
import ShowDeleteConfirm from "../../toast/ShowDeleteConfirm";

const UserListActions = ({ id, onUserRefresh }) => {
  const navigate = useNavigate();
  const role = sessionStorage.getItem("role");

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${env.BE_API_PATH}/Admin/delete-user/${id}`, {
        headers: {
          Authorization: `Bearer ${getBeToken()}`,
        },
      });

      if (response.data) {
        toast.success("Xóa người dùng thành công!");
        onUserRefresh();
      }
    } catch (err) {
      toast.error(
        err.response?.Message || "Có lỗi xảy ra khi xóa người dùng"
      );
    }
  };

  return (
    <div className="flex flex-wrap gap-2 sm:gap-4 justify-center">
      <button
        title="Xem chi tiết"
        className="border border-blue-600 text-blue-600 p-2 rounded-full hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out transform hover:scale-110 m-1 sm:m-2"
        onClick={() => navigate(`/${role}-dashboard/users/${id}`)}
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
