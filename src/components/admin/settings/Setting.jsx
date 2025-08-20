import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { beInstance } from "../../../config/axios";
import UserInfo from "../users/UserInfo";
import Loading from "../../Loading.jsx";

const Setting = () => {
  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await beInstance.get(`/User/${userId}`);
      toast.success("Lấy thông tin người dùng thành công!");
      setUser(response);
    } catch (err) {
      toast.error(err?.response?.data?.Message || "Không thể lấy dữ liệu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading)
    return (
      <Loading />
    );

  return (
    <div className="p-2 sm:p-4 md:p-6 max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto bg-white shadow-md rounded-lg mt-6 sm:mt-10 space-y-4 sm:space-y-6">
      <div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition font-medium text-sm sm:text-base"
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
      </div>

      <div className="text-center">
        <UserInfo user={user} />
      </div>

      <div className="flex justify-center">
        <button
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium text-sm sm:text-base"
          onClick={() => navigate("/admin-dashboard/setting/change-password")}
        >
          Đổi mật khẩu
        </button>
      </div>
    </div>
  );
};

export default Setting;
