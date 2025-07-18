import React from "react";

const StudentInfo = ({ student }) => {
  return (
    <div className="w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto bg-white shadow-md rounded p-4 sm:p-6 mt-6 sm:mt-10 space-y-3 sm:space-y-4">
      <h2 className="text-lg sm:text-xl font-bold text-blue-600 text-center">Thông tin sinh viên</h2>
      <div className="text-sm sm:text-base">
        <strong>Tên đăng nhập:</strong> {student.userName}
      </div>
      <div className="text-sm sm:text-base">
        <strong>Email:</strong> {student.email}
      </div>
      <div className="text-sm sm:text-base">
        <strong>Mã sinh viên:</strong> {student.studentCode}
      </div>
      <div className="text-sm sm:text-base">
        <strong>Ngày đăng ký:</strong>{" "}
        {student?.enrollDate
          ? new Date(student.enrollDate).toLocaleDateString("vi-VN")
          : "N/A"}
      </div>
      <div className="flex flex-col sm:flex-row justify-center gap-8 mb-8">
        <div className="text-center">
          <p className="font-medium text-gray-700 mb-1">Ảnh khuôn mặt</p>
          <img
            src={student?.faceImage ? student?.faceImage : "/images/faceImage.jpg"}
            alt="Ảnh khuôn mặt"
            className="w-full max-w-xs sm:max-w-sm h-auto object-cover rounded-md border mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default StudentInfo;