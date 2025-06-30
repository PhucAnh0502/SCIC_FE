import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaTrash } from "react-icons/fa";
import env from "../../../config/env.js";

const AttendanceListActions = ({ id, onAttendanceRefresh }) => {
    const navigate = useNavigate()
    const role = sessionStorage.getItem("role");

    const handleDelete = async (id) => {
        const confirm = window.confirm("Bạn chắc chắn muốn xóa thông tin điểm danh này?")
        if(confirm){
            try {
                const response = await axios.delete(`${env.BE_API_PATH}/Attendance/delete-attendance/${id}`,{
                    headers : {
                        Authorization : `Bearer ${sessionStorage.getItem("token")}`
                    }
                })

                if(response.status === 200){
                    onAttendanceRefresh()
                }
            } catch (error) {
                alert(error?.response?.data?.Message || "Có lỗi xảy ra khi xóa điểm danh")
            }
        }
    }

    return (
        <div className="flex flex-wrap gap-2 sm:gap-4 justify-center">
          <button
            title="Xem chi tiết"
            className="border border-blue-600 text-blue-600 p-2 rounded-full hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out transform hover:scale-110 m-1 sm:m-2"
            onClick={() => navigate(`/${role}-dashboard/attendances/${id}`)}
          >
            <FaEye size={18} />
          </button>
    
          <button
            title="Xóa điểm danh"
            className="border border-red-600 text-red-600 p-2 rounded-full hover:bg-red-600 hover:text-white transition duration-300 ease-in-out transform hover:scale-110 m-1 sm:m-2"
            onClick={() => handleDelete(id)}
          >
            <FaTrash size={18} />
          </button>
        </div>
      );
};

export default AttendanceListActions;
