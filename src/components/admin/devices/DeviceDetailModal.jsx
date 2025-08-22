import React, { useState, useEffect } from "react";
import { getDeviceById } from "../../../utils/AdminHelper.jsx";
import { toast } from "react-toastify";
import Loading from "../../Loading.jsx";

const DeviceDetailModal = ({ id, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [device, setDevice] = useState(null);

  const fetchDevice = async () => {
    setLoading(true);
    try {
      const response = await getDeviceById(id);
      setDevice(response);
    } catch (err) {
      toast.error(err?.response?.data?.Message || "Không thể lấy dữ liệu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDevice();
    }
  }, [id]);

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-4 sm:p-6 relative" onClick={(e) => e.stopPropagation()}>
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          ✕
        </button>

        <h2 className="text-lg sm:text-xl font-semibold text-blue-600 text-center mb-4">
          Thông tin thiết bị
        </h2>

        {loading ? (
          <Loading />
        ) : device ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base">
            <div>
              <strong>ID:</strong>
              <p>{device.id?.id}</p>
            </div>
            <div>
              <strong>Tên:</strong>
              <p>{device.name}</p>
            </div>
            <div>
              <strong>Loại:</strong>
              <p>{device.type}</p>
            </div>
            <div>
              <strong>Nhãn (Label):</strong>
              <p>{device.label}</p>
            </div>
            <div>
              <strong>Profile:</strong>
              <p>{device.deviceProfileName}</p>
            </div>
            <div>
              <strong>Profile ID:</strong>
              <p>{device.deviceProfileId?.id}</p>
            </div>
            <div>
              <strong>Tenant ID:</strong>
              <p>{device.tenantId?.id}</p>
            </div>
            <div>
              <strong>Customer ID:</strong>
              <p>{device.customerId?.id}</p>
            </div>
            <div>
              <strong>Trạng thái:</strong>
              <p className={device.active ? "text-green-600" : "text-red-600"}>
                {device.active ? "Đang hoạt động" : "Không hoạt động"}
              </p>
            </div>
            <div>
              <strong>Thời gian tạo:</strong>
              <p>{new Date(device.createdTime).toLocaleString()}</p>
            </div>
            <div>
              <strong>Phiên bản:</strong>
              <p>{device.version}</p>
            </div>
            <div>
              <strong>Cấu hình:</strong>
              <p>{device.deviceData?.configuration?.type}</p>
            </div>
            <div>
              <strong>Cấu hình truyền:</strong>
              <p>{device.deviceData?.transportConfiguration?.type}</p>
            </div>
          </div>
        ) : (
          <p>Không có thông tin thiết bị.</p>
        )}
      </div>
    </div>
  );
};

export default DeviceDetailModal;
