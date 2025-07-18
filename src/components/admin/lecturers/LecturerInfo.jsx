import React from "react";

const LecturerInfo = ({ lecturer }) => {
  return (
    <div className="w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto bg-white shadow-md rounded p-4 sm:p-6 mt-6 sm:mt-10 space-y-3 sm:space-y-4">
      <h2 className="text-lg sm:text-xl font-bold text-blue-600 text-center">
        Thông tin giảng viên
      </h2>
      <div className="text-sm sm:text-base">
        <strong>Tên đăng nhập:</strong> {lecturer.userName}
      </div>
      <div className="text-sm sm:text-base">
        <strong>Email:</strong> {lecturer.email}
      </div>
      <div className="text-sm sm:text-base">
        <strong>Mã giảng viên:</strong> {lecturer.lecturerCode}
      </div>
      <div className="text-sm sm:text-base">
        <strong>Ngày đăng ký:</strong>{" "}
        {lecturer?.hireDate
          ? new Date(lecturer.hireDate).toLocaleDateString("vi-VN")
          : "N/A"}
      </div>
      <div className="flex flex-col sm:flex-row justify-center gap-8 mb-8">
        <div className="text-center">
          <p className="font-medium text-gray-700 mb-1">Ảnh khuôn mặt</p>
          <img
            src={lecturer?.faceImage ? lecturer?.faceImage : "/images/faceImage.jpg"}
            alt="Ảnh khuôn mặt"
            className="w-full max-w-xs sm:max-w-sm h-auto object-cover rounded-md border mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default LecturerInfo;
