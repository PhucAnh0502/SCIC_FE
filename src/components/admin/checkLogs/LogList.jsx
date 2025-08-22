import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getAllLogs,
  getDeviceById,
  getUserById,
} from "../../../utils/AdminHelper";
import DataTable from "react-data-table-component";
import { columns } from "./LogListColumn";
import LogFilters from "./LogFilters";
import Loading from "../../common/Loading";

const LogList = () => {
  const [loading, setLoading] = useState(false);
  const [logList, setLogList] = useState([]);
  const [filteredLogList, setFilteredLogList] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [filterStartTime, setFilterStartTime] = useState("");
  const [filterEndTime, setFilterEndTime] = useState("");

  const fetchLogList = async () => {
    setLoading(true);
    try {
      const logs = await getAllLogs();

      const userCache = new Map();
      const deviceCache = new Map();

      const data = await Promise.all(
        logs.map(async (log, index) => {
          let user = userCache.get(log.userId);
          if (!user) {
            user = await getUserById(log.userId);
            userCache.set(log.userId, user);
          }

          let device = deviceCache.get(log.deviceId);
          if (!device) {
            device = await getDeviceById(log.deviceId);
            deviceCache.set(log.deviceId, device);
          }

          const createdDate = new Date(log.createdOn);
          return {
            id: log.id,
            sno: index + 1,
            deviceLabel: device?.label || "N/A",
            fullName: user?.fullName || "N/A",
            email: user?.email || "N/A",
            userRoles: user?.userRoles?.$values || [],
            status: log.status || "N/A",
            time: createdDate.toLocaleString("vi-VN"),
            createdDate, 
          };
        })
      );

      setLogList(data);
      setFilteredLogList(data);
    } catch (error) {
      toast.error(error?.message || "Có lỗi xảy ra khi lấy nhật ký");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogList();
  }, []);

  const filterLogs = (selectedStatus, startTime, endTime) => {
    const start = startTime ? new Date(startTime) : null;
    const end = endTime ? new Date(endTime) : null;

    const filtered = logList.filter((log) => {
      const matchStatus = !selectedStatus || log.status === selectedStatus;
      const matchStart = !start || log.createdDate >= start;
      const matchEnd = !end || log.createdDate <= end;
      return matchStatus && matchStart && matchEnd;
    });

    setFilteredLogList(filtered);
  };

  useEffect(() => {
    filterLogs(selectedStatus, filterStartTime, filterEndTime);
  }, [selectedStatus, filterStartTime, filterEndTime]);

  if (loading)
    return (
      <Loading />
    );

  return (
    <div className="p-2 sm:p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="text-center">
        <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-5">
          Quản lý vào ra
        </h3>
      </div>

      <LogFilters
        selectedStatus={selectedStatus}
        filterStartTime={filterStartTime}
        filterEndTime={filterEndTime}
        onStartDateChange={(e) => setFilterStartTime(e.target.value)}
        onEndDateChange={(e) => setFilterEndTime(e.target.value)}
        handleStatusChange={(e) => setSelectedStatus(e.target.value)}
      />

      <div className="mt-4 sm:mt-5 w-full overflow-x-auto">
        <div className="min-w-[700px]">
          <DataTable
            columns={columns}
            data={filteredLogList}
            pagination
            responsive
            highlightOnHover
            striped
            customStyles={{
              table: { style: { minWidth: "100%" } },
              rows: { style: { fontSize: "0.95rem" } },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LogList;
