import React, { useEffect } from "react";
import { beInstance } from "../../../config/axios";
import { toast } from "react-toastify";
import {
  startSignalRConnection,
  stopSignalRConnection,
} from "../../../config/socket";

const AttendanceInfo = ({ attendanceInfo, deviceInfo, setAttendanceInfo }) => {
  useEffect(() => {
    const handleTelemetry = async (message) => {
      try {
        const data = JSON.parse(message);
        const deviceId = data?.data?.data?.DeviceId?.[0]?.[1];
        const studentId = data?.data?.data?.StudentId?.[0]?.[1];

        if (deviceId && studentId) {
          console.log("Nhận dữ liệu từ thiết bị:", data);
          await handleAttend(deviceId, studentId);
        }
      } catch (error) {
        console.error("Lỗi khi xử lý dữ liệu từ socket:", error);
        toast.error("Lỗi khi nhận dữ liệu từ thiết bị");
      }
    };

    startSignalRConnection(handleTelemetry);

    return () => {
      stopSignalRConnection();
    };
  }, []);

  if (!attendanceInfo)
    return (
      <div className="text-center text-gray-500 mt-10">Không có dữ liệu</div>
    );

  const { lecturer, student, deviceId, timeStart, timeEnd, createdAt } =
    attendanceInfo;

  const handleAttend = async (deviceId, studentId) => {
    try {
      const response = await beInstance.get(`/User/${studentId}`);
      const studentName = response?.fullName || "Sinh viên";

      await beInstance.put(
        `/Attendance/update-student-attendance/${deviceId}/${studentId}`
      );

      toast.success(`${studentName} đã điểm danh thành công`);

      const updatedStudents = attendanceInfo.student.$values.map((s) =>
        s.student.userId === studentId ? { ...s, isAttended: true } : s
      );

      setAttendanceInfo({
        ...attendanceInfo,
        student: { $values: updatedStudents },
      });
    } catch (error) {
      console.error(error);
      toast.error("Thay đổi trạng thái thất bại");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-4 sm:p-8 rounded-2xl shadow-lg space-y-6 mt-10 border border-gray-100">
      <h2 className="text-3xl font-bold text-blue-600 mb-4 text-center">
        📋 Chi tiết điểm danh
      </h2>

      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-gray-700">🕰️ Ngày tạo</h3>
        <p className="text-gray-600">
          {new Date(createdAt).toLocaleString("vi-VN")}
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-gray-700 mb-2 text-lg">
          👨‍🏫 Giảng viên
        </h3>
        <table className="min-w-full text-sm text-left border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border">Tên</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Mã giảng viên</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border">
                {lecturer?.userName || "N/A"}
              </td>
              <td className="px-4 py-2 border">{lecturer?.email}</td>
              <td className="px-4 py-2 border">{lecturer?.lecturerCode}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <h3 className="font-semibold text-gray-700 mb-2 text-lg">
          🎓 Sinh viên
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-[600px] w-full text-sm text-left border border-gray-200 rounded-lg">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 border">STT</th>
                <th className="px-4 py-2 border">Tên</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">MSSV</th>
                <th className="px-4 py-2 border">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {student?.$values?.map((s, index) => (
                <tr
                  key={s.student?.userId || index}
                  className="hover:bg-gray-50"
                >
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">
                    {s.student?.userName || "N/A"}
                  </td>
                  <td className="px-4 py-2 border">{s.student?.email}</td>
                  <td className="px-4 py-2 border">{s.student?.studentCode}</td>
                  <td className="px-4 py-2 border">
                    {s.isAttended ? (
                      <span className="text-green-600 font-medium">
                        ✅ Có mặt
                      </span>
                    ) : (
                      <span
                        className="text-red-600 font-medium cursor-pointer"
                        onClick={() => handleAttend(deviceId, s.student.userId)}
                      >
                        ❌ Vắng
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-gray-700">
          📱 Thiết bị sử dụng
        </h3>
        <p className="text-gray-600">
          <strong>Tên thiết bị : </strong>
          {deviceInfo.name}
        </p>
        <p className="text-gray-600">
          <strong>Loại thiết bị : </strong>
          {deviceInfo.type}
        </p>
        <p className="text-gray-600">
          <strong>Nhãn thiết bị : </strong>
          {deviceInfo.label}
        </p>
        <p className="text-gray-600">
          <strong>Trạng thái : </strong>
          {deviceInfo.active ? "Đang hoạt động" : "Không hoạt động"}
        </p>
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-gray-700">🗓️ Thời gian</h3>
        <p className="text-gray-600">
          <strong>Bắt đầu:</strong>{" "}
          {new Date(timeStart).toLocaleString("vi-VN")}
        </p>
        <p className="text-gray-600">
          <strong>Kết thúc:</strong> {new Date(timeEnd).toLocaleString("vi-VN")}
        </p>
      </div>
    </div>
  );
};

export default AttendanceInfo;
