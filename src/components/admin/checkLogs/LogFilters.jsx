import React from "react";

const LogFilters = ({
  selectedStatus,
  filterStartTime,
  filterEndTime,
  onStartDateChange,
  onEndDateChange,
  handleStatusChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between flex-wrap gap-4 mb-6 w-full">
      <div className="flex flex-wrap gap-3 items-center w-full sm:w-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <label className="text-gray-700 font-medium w-[100px] sm:w-auto">
            Trạng thái:
          </label>
          <select
            className="min-w-[160px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedStatus}
            onChange={handleStatusChange}
          >
            <option value="">Tất cả</option>
            <option value="Check in">Check in</option>
            <option value="Check-in late">Check-in late</option>
            <option value="Check out">Check out</option>
          </select>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <label className="text-gray-700 font-medium w-[120px] sm:w-auto">
            Bắt đầu:
          </label>
          <input
            type="datetime-local"
            className="min-w-[180px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterStartTime}
            onChange={onStartDateChange}
          />
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <label className="text-gray-700 font-medium w-[120px] sm:w-auto">
            Kết thúc:
          </label>
          <input
            type="datetime-local"
            className="min-w-[180px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterEndTime}
            onChange={onEndDateChange}
          />
        </div>
      </div>
    </div>
  );
};

export default LogFilters;