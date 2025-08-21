import React from "react";
import { FaTimes } from "react-icons/fa";

const PersonalProfileModal = ({ isOpen, onClose, user }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/30"
        onClick={onClose}
      ></div>

      {/* Modal content */}
      <div
        className="relative bg-white p-6 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto z-50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-700">
            Thông tin người dùng
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 transition"
          >
            <FaTimes size={22} />
          </button>
        </div>

        {/* Thông tin người dùng dạng list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <p className="text-gray-500 text-sm">Tên đăng nhập</p>
            <p className="font-medium text-gray-800">{user?.userName}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <p className="text-gray-500 text-sm">Họ và tên</p>
            <p className="font-medium text-gray-800">{user?.fullName}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <p className="text-gray-500 text-sm">Số CCCD</p>
            <p className="font-medium text-gray-800">{user?.idNumber}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <p className="text-gray-500 text-sm">Email</p>
            <p className="font-medium text-gray-800">{user?.email}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm sm:col-span-2">
            <p className="text-gray-500 text-sm">Vai trò</p>
            <p className="font-medium text-gray-800">
              {user?.userRoles?.$values?.join(", ")}
            </p>
          </div>
        </div>

        {/* Ảnh */}
        <div className="flex flex-col sm:flex-row justify-center gap-8 mb-6">
          <div className="text-center">
            <p className="font-semibold text-gray-700 mb-2">Ảnh khuôn mặt</p>
            <img
              src={user?.faceImage ? user?.faceImage : "/public/faceImage.jpg"}
              alt="Ảnh khuôn mặt"
              className="w-full max-w-xs sm:max-w-sm h-auto object-cover rounded-lg border shadow"
            />
          </div>
          <div className="text-center">
            <p className="font-semibold text-gray-700 mb-2">Ảnh vân tay</p>
            <img
              src={
                user?.fingerprintImage
                  ? user?.fingerprintImage
                  : "/public/fingerprintImage.png"
              }
              alt="Ảnh vân tay"
              className="w-full max-w-xs sm:max-w-sm h-auto object-cover rounded-lg border shadow"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalProfileModal;
