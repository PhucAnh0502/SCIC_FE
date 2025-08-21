import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaUserGraduate,
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
  const role = sessionStorage.getItem("role")?.toLowerCase() || "admin";
  const [open, setOpen] = useState(false);

  const menuItems = [
    {
      to: `/${role}-dashboard`,
      icon: <FaTachometerAlt />,
      label: "Dashboard",
      end: true,
    },
    { to: `/${role}-dashboard/users`, icon: <FaUsers />, label: "Người dùng" },
    {
      to: `/${role}-dashboard/students`,
      icon: <FaUserGraduate />,
      label: "Sinh viên",
    },
    {
      to: `/${role}-dashboard/lecturers`,
      icon: <FaChalkboardTeacher />,
      label: "Giảng viên",
    },
    {
      to: `/${role}-dashboard/devices`,
      icon: <FaDesktop />,
      label: "Thiết bị",
    },
    {
      to: `/${role}-dashboard/permissions`,
      icon: <FaFileAlt />,
      label: "Phân quyền",
    },
    {
      to: `/${role}-dashboard/attendances`,
      icon: <FaClipboardCheck />,
      label: "Điểm danh",
    },
    {
      to: `/${role}-dashboard/log-list`,
      icon: <FaClock />,
      label: "Nhật ký vào/ra",
    },
  ];

  return (
    <>
      {/* Nút mở sidebar trên mobile */}
      <button
        className="fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-md shadow-md md:hidden"
        onClick={() => setOpen(true)}
      >
        <FaBars size={20} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-white text-blue-600 shadow-md transform transition-transform duration-300
        ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:block`}
      >
        {/* Header */}
        <div className="flex items-center justify-center h-16 border-b border-gray-200 bg-blue-200">
          {/* <img src="/logo.png" alt="logo" className="w-12 h-12" /> */}
        </div>

        {/* Nút đóng (mobile) */}
        <div className="md:hidden flex justify-end p-3">
          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Menu */}
        <nav className="mt-4 flex flex-col gap-2 px-3">
          {menuItems.map(({ to, icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-xl border text-sm transition-all
        ${
          isActive
            ? "bg-blue-100 border-blue-200"
            : "border-blue-100 hover:bg-blue-50"
        }`
              }
              onClick={() => setOpen(false)}
            >
              <span className="text-2xl text-blue-500 hover:text-blue-700">{icon}</span>{" "}
              {/* Icon giữ màu cũ */}
              <span
                className={`font-semibold text-blue-700 hover:text-blue-800 transition-colors`}
              >
                {label}
              </span>{" "}
              {/* Chữ đậm hơn */}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
