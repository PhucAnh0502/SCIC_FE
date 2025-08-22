import React from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { beInstance } from "../../../config/axios";
import { toast } from "react-toastify";
import ShowDeleteConfirm from "../../toast/ShowDeleteConfirm";

const DeviceListActions = ({ id, onDeviceRefresh, onViewDevice }) => {

  const handleDelete = async () => {
    try {
      await beInstance.delete(`/Device/delete-device/${id}`);
      toast.success("Xóa thiết bị thành công!");
      if (onDeviceRefresh) onDeviceRefresh();
    } catch (error) {
      toast.error(
        error?.response?.data?.Message || "Có lỗi xảy ra khi xóa thiết bị"
      );
    }
  };

  return (
    <div className="flex flex-wrap gap-2 sm:gap-4 justify-center">
      <button
        title="Xem chi tiết"
        className="border border-blue-600 text-blue-600 p-2 rounded-full hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out transform hover:scale-110 m-1 sm:m-2"
        onClick={() => onViewDevice(id)}
      >
        <FaEye size={18} />
      </button>
      <ShowDeleteConfirm
        onConfirm={handleDelete}
        message="Bạn chắc chắn muốn xóa thiết bị này?"
        icon={<FaTrash size={18} />}
        buttonClassName="border border-red-600 text-red-600 p-2 rounded-full hover:bg-red-600 hover:text-white transition duration-300 ease-in-out transform hover:scale-110 m-1 sm:m-2"
      />
    </div>
  );
};

export default DeviceListActions;
