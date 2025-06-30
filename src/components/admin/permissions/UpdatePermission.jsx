import React, { useState } from "react";
import axios from "axios";
import env from "../../../config/env";
import { getBeToken } from "../../../config/token.js";

const UpdatePermission = ({
  permission,
  onSuccess,
  onCancel,
  users,
  devices,
}) => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    userIds: permission.users.$values.map((user) => user.id),
    deviceIds: permission.deviceIds.$values,
    timeStart: permission.timeStart,
    timeEnd: permission.timeEnd,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.put(
        `${env.BE_API_PATH}/Permission/update-permission/${permission.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${getBeToken()}`,
          },
        }
      );
      onSuccess(response.data.message);
    } catch (err) {
      setError(err?.response?.data?.message || "Cập nhật thất bại");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div>
        <label className="block text-sm font-medium mb-2">
          Chọn người dùng
        </label>

        {/* Người dùng đã chọn */}
        <div className="flex flex-wrap gap-2 mb-2">
          {formData.userIds.map((id) => {
            const user = users.find((s) => s.id === id);
            if (!user) return null;
            return (
              <div
                key={id}
                className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {user.fullName}
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      userIds: formData.userIds.filter((sid) => sid !== id),
                    })
                  }
                  className="ml-2 text-blue-500 hover:text-red-500"
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>

        {/* Danh sách người dùng chưa chọn */}
        <select
          onChange={(e) => {
            const selectedId = e.target.value;
            if (selectedId && !formData.userIds.includes(selectedId)) {
              setFormData({
                ...formData,
                userIds: [...formData.userIds, selectedId],
              });
            }
            e.target.value = "";
          }}
          className="border rounded px-3 py-2 w-full text-sm"
        >
          <option value="" key="default-student">
            -- Chọn người dùng --
          </option>
          {users
            .filter((user) => !formData.userIds.includes(user.id))
            .map((user) => (
              <option key={user.id} value={user.id}>
                {user.fullName} ({user.userName})
              </option>
            ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Chọn thiết bị</label>

        {/* Thẻ thiết bị đã chọn */}
        <div className="flex flex-wrap gap-2 mb-2">
          {formData.deviceIds.map((id) => {
            const device = devices.find((s) => s.id.id === id);
            if (!device) return null;
            return (
              <div
                key={id}
                className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {device.type}
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      deviceIds: formData.deviceIds.filter(
                        (sid) => sid !== id
                      ),
                    })
                  }
                  className="ml-2 text-blue-500 hover:text-red-500"
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>

        {/* Danh sách thiết bị chưa chọn */}
        <select
          onChange={(e) => {
            const selectedId = e.target.value;
            if (selectedId && !formData.deviceIds.includes(selectedId)) {
              setFormData({
                ...formData,
                deviceIds: [...formData.deviceIds, selectedId],
              });
            }
            e.target.value = "";
          }}
          className="border rounded px-3 py-2 w-full text-sm"
        >
          <option value="" key="default-student">
            -- Chọn thiết bị --
          </option>
          {devices
            .filter((device) => !formData.deviceIds.includes(device.id.id))
            .map((device) => (
              <option key={device.id.id} value={device.id.id}>
                {device.type} ({device.label || "N/A"})
              </option>
            ))}
        </select>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-10 flex-wrap">
        <div className="w-full sm:w-1/2">
          <label className="block text-sm font-medium">Ngày bắt đầu</label>
          <input
            type="date"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            value={formData.timeStart.split("T")[0]}
            onChange={(e) => {
              setFormData({ ...formData, timeStart: e.target.value });
            }}
          />
        </div>
        <div className="w-full sm:w-1/2">
          <label className="block text-sm font-medium">Ngày kết thúc</label>
          <input
            type="date"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            value={formData.timeEnd.split("T")[0]}
            onChange={(e) => {
              setFormData({ ...formData, timeEnd: e.target.value });
            }}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button
          type="submit"
          className="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm sm:text-base"
        >
          Lưu
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="w-full sm:w-auto bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 text-sm sm:text-base"
        >
          Hủy
        </button>
      </div>
    </form>
  );
};

export default UpdatePermission;