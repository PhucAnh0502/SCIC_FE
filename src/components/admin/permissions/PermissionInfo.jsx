import React, { useEffect, useState } from "react";
import { getDeviceById } from "../../../utils/AdminHelper";

const PermissionInfo = ({ data }) => {
  const [deviceInfoList, setDeviceInfoList] = useState([])

  useEffect(() => {
    const fetchDevices = async () => {
      if(!data.deviceIds.$values) return;
      try {
        const devices = await Promise.all(
          data.deviceIds.$values.map((id) => getDeviceById(id))
        )
        setDeviceInfoList(devices);
      } catch (err) {
        alert(err || "Không thể lấy thông tin thiết bị")
      }
    }

    fetchDevices()
  },[data])
  if (!data) return <p>❌ Không có dữ liệu để hiển thị.</p>;

  const formatDateTime = (isoString) => {
    return new Date(isoString).toLocaleString("vi-VN");
  };

  return (
    <div className="p-2 sm:p-4 bg-white shadow-lg rounded-lg space-y-6 overflow-x-auto">
      <h2 className="text-lg sm:text-2xl font-bold text-blue-600 text-center">
        ✅ Thông tin phân quyền
      </h2>

      <div className="text-sm sm:text-base">
        📅 <strong>Thời gian bắt đầu:</strong> {formatDateTime(data.timeStart)}
      </div>

      <div className="text-sm sm:text-base">
        ⏰ <strong>Thời gian kết thúc:</strong> {formatDateTime(data.timeEnd)}
      </div>

      <div className="text-sm sm:text-base">
        🗓️ <strong>Ngày tạo:</strong> {formatDateTime(data.createdAt)}
      </div>

      <div>
        <h3 className="text-base sm:text-lg font-semibold mt-4 mb-2">
          🖥️ Thiết bị được cấp quyền
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-[500px] w-full table-auto border border-collapse border-gray-300 text-xs sm:text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 sm:px-4 py-2">STT</th>
                <th className="border px-2 sm:px-4 py-2">Tên thiết bị</th>
                <th className="border px-2 sm:px-4 py-2">Loại thiết bị</th>
                <th className="border px-2 sm:px-4 py-2">Nhãn thiết bị</th>
                <th className="border px-2 sm:px-4 py-2">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {deviceInfoList.map((device, index) => (
                <tr key={device.id.id} className="text-center">
                  <td className="border px-2 sm:px-4 py-2">{index + 1}</td>
                  <td className="border px-2 sm:px-4 py-2">{device.name}</td>
                  <td className="border px-2 sm:px-4 py-2">{device.type}</td>
                  <td className="border px-2 sm:px-4 py-2">{device.name}</td>
                  <td className="border px-2 sm:px-4 py-2">{device.active ? "Đang hoạt động" : "Không hoạt động"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-base sm:text-lg font-semibold mt-4 mb-2">
          👥 Người dùng được phân quyền
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-[500px] w-full table-auto border border-collapse border-gray-300 text-xs sm:text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-1 sm:px-2 py-1">STT</th>
                <th className="border px-1 sm:px-2 py-1">Username</th>
                <th className="border px-1 sm:px-2 py-1">Họ tên</th>
                <th className="border px-1 sm:px-2 py-1">Email</th>
                <th className="border px-1 sm:px-2 py-1">Vai trò</th>
              </tr>
            </thead>
            <tbody>
              {data.users?.$values?.map((user, index) => (
                <tr key={user.id} className="text-center">
                  <td className="border px-1 sm:px-2 py-1">{index + 1}</td>
                  <td className="border px-1 sm:px-2 py-1">{user.userName}</td>
                  <td className="border px-1 sm:px-2 py-1">{user.fullName}</td>
                  <td className="border px-1 sm:px-2 py-1">{user.email}</td>
                  <td className="border px-1 sm:px-2 py-1">
                    {user.userRoles?.$values?.join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PermissionInfo;