import React from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const DeviceListActions = ({ id }) => {
  const navigate = useNavigate();
  const role = sessionStorage.getItem("role");

  return (
    <div className="flex flex-wrap gap-2 sm:gap-4 justify-center">
      <button
        title="Xem chi tiết"
        className="border border-blue-600 text-blue-600 p-2 rounded-full hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out transform hover:scale-110 m-1 sm:m-2"
        onClick={() => navigate(`/${role}-dashboard/devices/${id}`)}
      >
        <FaEye size={18} />
      </button>
    </div>
  );
};

export default DeviceListActions;
