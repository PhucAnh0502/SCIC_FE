import React from "react";

const UserListFilters = ({
  searchtext,
  selectedRole,
  handleSearchChange,
  handleRoleChange,
  handleAddUser,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center flex-wrap gap-3 sm:gap-4 mb-6 w-full">
      <div className="flex items-center gap-2 sm:gap-4 flex-wrap w-full sm:w-auto">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên"
          className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
          value={searchtext}
          onChange={handleSearchChange}
        />

        <select
          name="role"
          className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
          value={selectedRole}
          onChange={handleRoleChange}
        >
          <option value="">Vai trò</option>
          <option value="Admin">Quản trị viên</option>
          <option value="Student">Sinh viên</option>
          <option value="Lecturer">Giảng viên</option>
          <option value="Default User">Khác</option>
        </select>
      </div>
      <button
        className="w-full sm:w-auto bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
        onClick={handleAddUser}
      >
        Thêm
      </button>
    </div>
  );
};

export default UserListFilters;
