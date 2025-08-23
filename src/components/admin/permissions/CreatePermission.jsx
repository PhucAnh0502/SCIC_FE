import React, { useEffect, useState } from "react";
import { getAllDevices, getAllUsers } from "../../../utils/AdminHelper";
import { beInstance } from "../../../config/axios";
import { toast } from "react-toastify";

const CreatePermission = ({onClose, onSuccess}) => {
  const [devices, setDevices] = useState([]);
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [deviceSearch, setDeviceSearch] = useState("");
  const [formData, setFormData] = useState({
    userIds: [],
    deviceIds: [],
    timeStart: "",
    timeEnd: "",
  });

  const fetchData = async () => {
    const [devices, users] = await Promise.all([
      getAllDevices(99, 0),
      getAllUsers(),
    ]);
    setDevices(devices);
    setUsers(users);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.userIds.length ||
      !formData.deviceIds.length ||
      !formData.timeStart ||
      !formData.timeEnd
    ) {
      setErrorMessage("Vui lòng điền đầy đủ thông tin phân quyền.");
      return;
    }

    try {
      await beInstance.post("/Permission/create-permission", formData);
      toast.success("Phân quyền thành công!");
      onSuccess();
    } catch (error) {
      console.log(error);
      toast.error(error?.message || error?.details || "Có lỗi khi phân quyền");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md space-y-4 mt-10 sm:mt-16 md:mt-20"
    >
      {/* Header */}
      <div className="relative flex items-center justify-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 text-center">
          Tạo phân quyền
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="absolute right-0 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>
      </div>

      {errorMessage && (
        <div className="text-red-600 text-sm bg-red-100 px-4 py-2 rounded border border-red-300 mb-2">
          {errorMessage}
        </div>
      )}

      {/* Người dùng */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Chọn người dùng
        </label>

        {/* Search user */}
        <input
          type="text"
          placeholder="Tìm kiếm người dùng..."
          value={userSearch}
          onChange={(e) => setUserSearch(e.target.value)}
          className="w-full mb-2 px-3 py-2 border rounded text-sm"
        />

        <div className="max-h-40 overflow-y-auto border rounded p-2 space-y-2">
          {users
            .filter(
              (user) =>
                user.userName
                  .toLowerCase()
                  .includes(userSearch.toLowerCase()) ||
                user.email.toLowerCase().includes(userSearch.toLowerCase())
            )
            .map((user) => (
              <label key={user.id} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={formData.userIds.includes(user.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData({
                        ...formData,
                        userIds: [...formData.userIds, user.id],
                      });
                    } else {
                      setFormData({
                        ...formData,
                        userIds: formData.userIds.filter(
                          (uid) => uid !== user.id
                        ),
                      });
                    }
                  }}
                />
                {user.userName} ({user.email})
              </label>
            ))}
        </div>
      </div>

      {/* Thiết bị */}
      <div>
        <label className="block text-sm font-medium mb-2">Chọn thiết bị</label>

        {/* Search device */}
        <input
          type="text"
          placeholder="Tìm kiếm thiết bị..."
          value={deviceSearch}
          onChange={(e) => setDeviceSearch(e.target.value)}
          className="w-full mb-2 px-3 py-2 border rounded text-sm"
        />

        <div className="max-h-48 overflow-y-auto border rounded p-2 space-y-2">
          {devices
            .filter(
              (device) =>
                device.type
                  .toLowerCase()
                  .includes(deviceSearch.toLowerCase()) ||
                (device.label || "")
                  .toLowerCase()
                  .includes(deviceSearch.toLowerCase())
            )
            .map((device) => (
              <label
                key={device.id.id}
                className="flex items-center gap-2 text-sm"
              >
                <input
                  type="checkbox"
                  checked={formData.deviceIds.includes(device.id.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData({
                        ...formData,
                        deviceIds: [...formData.deviceIds, device.id.id],
                      });
                    } else {
                      setFormData({
                        ...formData,
                        deviceIds: formData.deviceIds.filter(
                          (did) => did !== device.id.id
                        ),
                      });
                    }
                  }}
                />
                {device.type} ({device.label || "N/A"} -{" "}
                {device.active ? "Hoạt động" : "Không hoạt động"})
              </label>
            ))}
        </div>
      </div>

      {/* Thời gian */}
      <div className="flex flex-row items-center gap-4 sm:gap-10 w-full">
        <div className="w-1/2">
          <label className="block text-sm font-medium">Ngày bắt đầu</label>
          <input
            type="date"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            value={formData.timeStart}
            onChange={(e) =>
              setFormData({ ...formData, timeStart: e.target.value })
            }
          />
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium">Ngày kết thúc</label>
          <input
            type="date"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            value={formData.timeEnd}
            onChange={(e) =>
              setFormData({ ...formData, timeEnd: e.target.value })
            }
            min={formData.timeStart}
          />
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Hủy
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Tạo phân quyền
        </button>
      </div>
    </form>
  );
};

export default CreatePermission;
