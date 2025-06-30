import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-16 bg-blue-500 px-3 sm:px-6 shadow-md text-white">
        <div className="animate-spin border-4 border-white border-t-transparent rounded-full w-6 h-6 mr-2"></div>
        <span>Đang tải...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center text-white justify-between h-16 bg-blue-500 px-3 sm:px-6 shadow-md">
      <p className="text-base sm:text-lg font-semibold truncate max-w-[60vw]">
        {user ? `${user.fullName}` : "Chào mừng"}
      </p>
      <button
        className="px-3 sm:px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-300 flex items-center text-sm sm:text-base"
        onClick={handleLogout}
      >
        <FaSignOutAlt className="mr-2" />
        Đăng xuất
      </button>
    </div>
  );
};

export default Navbar;
