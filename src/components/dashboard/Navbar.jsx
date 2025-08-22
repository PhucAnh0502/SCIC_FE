import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle, FaUser, FaKey, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loading from "../common/Loading";
import PersonalProfileModal from "../admin/personal/PersonalProfileModal"; 
import ChangePassword from "../auth/ChangePassword";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleProfile = () => {
    setIsProfileOpen(true); 
    setIsOpen(false);
  };

  const handleChangePassword = () => {
    setIsChangePasswordOpen(true);
    setIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex items-center text-white justify-between h-16 bg-blue-200 px-3 sm:px-6 shadow-md">
        <p className="text-base sm:text-lg font-semibold truncate max-w-[60vw] text-blue-600">
          {user ? `${user.fullName}` : "Chào mừng"}
        </p>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            <FaUserCircle className="text-3xl text-blue-600" />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-700 rounded-lg shadow-lg overflow-hidden z-40">
              <button
                onClick={handleProfile}
                className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
              >
                <FaUser className="mr-2" /> Xem hồ sơ
              </button>
              <button
                onClick={handleChangePassword}
                className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
              >
                <FaKey className="mr-2" /> Đổi mật khẩu
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-red-600"
              >
                <FaSignOutAlt className="mr-2" /> Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>

      {isProfileOpen && (
        <PersonalProfileModal
          user={user}
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
        />
      )}

      {isChangePasswordOpen && (
        <ChangePassword
          userId={sessionStorage.getItem("userId")}
          isOpen={isChangePasswordOpen}
          onClose={() => setIsChangePasswordOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
