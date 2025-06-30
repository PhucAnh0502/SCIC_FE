import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import env from '../../../config/env';
// import { getBeToken } from '../../../config/token.js';
import { getDeviceById } from '../../../utils/AdminHelper.jsx';
import DeviceInfo from './DeviceInfo.jsx';

const DeviceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [device, setDevices] = useState({});
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const fetchDevices = async () => {
    setLoading(true);
    try {
      const response = await getDeviceById(id)
      setDevices(response);
    } catch (err) {
      alert(err?.response?.data?.Message || "Không thể lấy dữ liệu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, [id]);

//   const handleUpdateSuccess = (updatedLecturer) => {
//     setLecturer(updatedLecturer);
//     setEditMode(false);
//     fetchLecturer();
//   };

  if (loading)
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
        {/* Nếu có nút chỉnh sửa thì thêm w-full sm:w-auto */}
        {!editMode && (
          <button
            onClick={() => setEditMode(true)}
            className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm sm:text-base"
          >
            Chỉnh sửa
          </button>
        )}
      </div>

      {editMode ? (
        <div>Edit Mode</div>
      ) : (
        <DeviceInfo device={device} />
      )}
    </div>
  );
}

export default DeviceDetail