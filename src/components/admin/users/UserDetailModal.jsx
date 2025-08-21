import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { beInstance } from "../../../config/axios";
import { getBeToken } from "../../../config/token";
import Loading from "../../Loading.jsx";

const UserDetailModal = ({ userId, onClose, onUserUpdated }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await beInstance.get(`/User/${userId}`);
        const u = res?.data || res; 
        setUser(u);
        setFormData({
          name: u?.userName || "",
          email: u?.email || "",
        });
        toast.success("Lấy thông tin người dùng thành công!");
      } catch (err) {
        toast.error(err?.response?.data?.Message || "Không thể lấy dữ liệu.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      toast.warn("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    try {
        console.log("Updating user with data:", formData);
      const response = await beInstance.put(
        `/Admin/update-user/${user.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${getBeToken()}`,
          },
        }
      );

      toast.success("Cập nhật thành công!");
      onUserUpdated(response.data);
      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Cập nhật thất bại");
    }
  };

  if (loading) return <Loading />;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-4 sm:p-8 w-full max-w-2xl relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✖
        </button>

        <h2 className="text-lg sm:text-2xl font-bold mb-4 text-center text-blue-600">
          Thông tin người dùng
        </h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 rounded-lg overflow-hidden mb-6 bg-white text-sm sm:text-base">
              <tbody>
                <tr className="even:bg-gray-50 border-b">
                  <td className="p-3 font-semibold text-gray-700">Tên đăng nhập</td>
                  <td className="p-3 text-gray-800">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border p-2 rounded text-sm sm:text-base"
                    />
                  </td>
                </tr>
                <tr className="even:bg-gray-50 border-b">
                  <td className="p-3 font-semibold text-gray-700">Họ và tên</td>
                  <td className="p-3 text-gray-800">{user?.fullName}</td>
                </tr>
                <tr className="even:bg-gray-50 border-b">
                  <td className="p-3 font-semibold text-gray-700">Số CCCD</td>
                  <td className="p-3 text-gray-800">{user?.idNumber}</td>
                </tr>
                <tr className="even:bg-gray-50 border-b">
                  <td className="p-3 font-semibold text-gray-700">Email</td>
                  <td className="p-3 text-gray-800">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border p-2 rounded text-sm sm:text-base"
                    />
                  </td>
                </tr>
                <tr className="even:bg-gray-50 border-b">
                  <td className="p-3 font-semibold text-gray-700">Vai trò</td>
                  <td className="p-3 text-gray-800">
                    {user?.userRoles?.$values?.map((role, index) => (
                      <span key={index}>
                        {role}
                        {index < user?.userRoles?.$values.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-8 mb-6">
            <div className="text-center">
              <p className="font-medium text-gray-700 mb-1">Ảnh khuôn mặt</p>
              <img
                src={user?.faceImage ? user?.faceImage : "/public/faceImage.jpg"}
                alt="Ảnh khuôn mặt"
                className="w-full max-w-xs sm:max-w-sm h-auto object-cover rounded-md border mx-auto"
              />
            </div>
            <div className="text-center">
              <p className="font-medium text-gray-700 mb-1">Ảnh vân tay</p>
              <img
                src={
                  user?.fingerprintImage
                    ? user?.fingerprintImage
                    : "/public/fingerprintImage.png"
                }
                alt="Ảnh vân tay"
                className="w-full max-w-xs sm:max-w-sm h-auto object-cover rounded-md border mx-auto"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end">
            <button
              type="submit"
              className="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm sm:text-base"
            >
              Cập nhật
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 text-sm sm:text-base"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDetailModal;
