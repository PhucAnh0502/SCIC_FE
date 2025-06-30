import React from "react";

const StudentListFilters = ({
  searchText,
  handleSearchChange,
  handleAddStudent,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center flex-wrap gap-3 sm:gap-4 mb-6 w-full">
      <div className="flex items-center gap-2 sm:gap-4 flex-wrap w-full sm:w-auto">
        <input
          type="text"
          placeholder="Nhập tên hoặc MSSV"
          className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
          value={searchText}
          onChange={handleSearchChange}
        />
      </div>
      <button
        className="w-full sm:w-auto bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
        onClick={handleAddStudent}
      >
        Thêm
      </button>
    </div>
  );
};

export default StudentListFilters;