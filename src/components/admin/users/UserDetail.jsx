import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { beInstance } from "../../../config/axios";
import UserInfo from "./UserInfo";
import UserUpdateForm from "./UserUpdateForm";

const UserDetail = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await beInstance.get(`/User/${userId}`);
        setUser(res);
        toast.success("Lấy thông tin người dùng thành công!");
      } catch (err) {
        toast.error(err?.response?.data?.Message || "Không thể lấy dữ liệu.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleUpdateSuccess = (updatedUser) => {
    setUser(updatedUser);
    setEditMode(false);
    toast.success("Cập nhật thông tin thành công!");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 rounded-full animate-spin border-t-transparent mb-4"></div>
          <p className="text-lg font-semibold text-blue-500 animate-pulse">
            Đang tải...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 sm:p-4 md:p-6 max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition text-sm sm:text-base"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="hidden xs:inline">Quay lại</span>
        </button>

        {!editMode && (
          <button
            onClick={() => setEditMode(true)}
            className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm sm:text-base"
          >
            Chỉnh sửa
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-3 sm:p-6">
        {editMode ? (
          <UserUpdateForm
            user={user}
            onSuccess={handleUpdateSuccess}
            onCancel={() => setEditMode(false)}
          />
        ) : (
          <UserInfo user={user} />
        )}
      </div>
    </div>
  );
};

export default UserDetail;
