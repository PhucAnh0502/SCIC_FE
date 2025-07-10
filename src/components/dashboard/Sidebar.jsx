import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaUserGraduate,
  FaCog,
  FaDesktop,
  FaFileAlt,
  FaTachometerAlt,
  FaUsers,
  FaChalkboardTeacher,
  FaClipboardCheck,
  FaBars,
  FaTimes,
  FaClock,
} from "react-icons/fa";

const Sidebar = () => {
  const role = sessionStorage.getItem("role").toLowerCase();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger for mobile */}
      <button
        className="fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-md shadow-lg md:hidden"
        onClick={() => setOpen(true)}
        aria-label="Mở menu"
      >
        <FaBars size={22} />
      </button>

      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-xl transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:block min-h-screen`}
        style={{ height: "100vh" }}
      >
        {/* Close button for mobile */}
        <div className="md:hidden flex justify-end p-4">
          <button
            className="text-white"
            onClick={() => setOpen(false)}
            aria-label="Đóng menu"
          >
            <FaTimes size={22} />
          </button>
        </div>
        {/* Header */}
        <div className="bg-slate-900 h-16 flex items-center justify-center shadow-md text-xl font-bold">
          <img src="/logo.png" alt="logo" className="w-16 h-16 "/>
        </div>
        {/* NavLinks */}
        <div className="space-y-3 mt-4">
          <NavLink
            to={`/${role}-dashboard`}
            className={({ isActive }) =>
              `${
                isActive ? "bg-blue-400" : "hover:bg-blue-600"
              } flex items-center space-x-4 block py-3 px-6 rounded-lg transition-colors duration-300`
            }
            end
            onClick={() => setOpen(false)}
          >
            <FaTachometerAlt className="text-xl" />
            <span className="text-base md:text-lg">Dashboard</span>
          </NavLink>
          <NavLink
            to={`/${role}-dashboard/users`}
            className={({ isActive }) =>
              `${
                isActive ? "bg-blue-400" : "hover:bg-blue-600"
              } flex items-center space-x-4 block py-3 px-6 rounded-lg transition-colors duration-300`
            }
            onClick={() => setOpen(false)}
          >
            <FaUsers className="text-xl" />
            <span className="text-base md:text-lg">Người dùng</span>
          </NavLink>
          <NavLink
            to={`/${role}-dashboard/students`}
            className={({ isActive }) =>
              `${
                isActive ? "bg-blue-400" : "hover:bg-blue-600"
              } flex items-center space-x-4 block py-3 px-6 rounded-lg transition-colors duration-300`
            }
            onClick={() => setOpen(false)}
          >
            <FaUserGraduate className="text-xl" />
            <span className="text-base md:text-lg">Sinh viên</span>
          </NavLink>
          <NavLink
            to={`/${role}-dashboard/lecturers`}
            className={({ isActive }) =>
              `${
                isActive ? "bg-blue-400" : "hover:bg-blue-600"
              } flex items-center space-x-4 block py-3 px-6 rounded-lg transition-colors duration-300`
            }
            onClick={() => setOpen(false)}
          >
            <FaChalkboardTeacher className="text-xl" />
            <span className="text-base md:text-lg">Giảng viên</span>
          </NavLink>
          <NavLink
            to={`/${role}-dashboard/devices`}
            className={({ isActive }) =>
              `${
                isActive ? "bg-blue-400" : "hover:bg-blue-600"
              } flex items-center space-x-4 block py-3 px-6 rounded-lg transition-colors duration-300`
            }
            onClick={() => setOpen(false)}
          >
            <FaDesktop className="text-xl" />
            <span className="text-base md:text-lg">Thiết bị</span>
          </NavLink>
          <NavLink
            to={`/${role}-dashboard/permissions`}
            className={({ isActive }) =>
              `${
                isActive ? "bg-blue-400" : "hover:bg-blue-600"
              } flex items-center space-x-4 block py-3 px-6 rounded-lg transition-colors duration-300`
            }
            onClick={() => setOpen(false)}
          >
            <FaFileAlt className="text-xl" />
            <span className="text-base md:text-lg">Phân quyền</span>
          </NavLink>
          <NavLink
            to={`/${role}-dashboard/attendances`}
            className={({ isActive }) =>
              `${
                isActive ? "bg-blue-400" : "hover:bg-blue-600"
              } flex items-center space-x-4 block py-3 px-6 rounded-lg transition-colors duration-300`
            }
            onClick={() => setOpen(false)}
          >
            <FaClipboardCheck className="text-xl" />
            <span className="text-base md:text-lg">Điểm danh</span>
          </NavLink>
          <NavLink
            to={`/${role}-dashboard/log-list`}
            className={({ isActive }) =>
              `${
                isActive ? "bg-blue-400" : "hover:bg-blue-600"
              } flex items-center space-x-4 block py-3 px-6 rounded-lg transition-colors duration-300`
            }
            onClick={() => setOpen(false)}
          >
            <FaClock className="text-xl" />
            <span className="text-base md:text-lg">Nhật ký vào/ra</span>
          </NavLink>
          <NavLink
            to={`/${role}-dashboard/setting`}
            className={({ isActive }) =>
              `${
                isActive ? "bg-blue-400" : "hover:bg-blue-600"
              } flex items-center space-x-4 block py-3 px-6 rounded-lg transition-colors duration-300`
            }
            onClick={() => setOpen(false)}
          >
            <FaCog className="text-xl" />
            <span className="text-base md:text-lg">Cài đặt</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
