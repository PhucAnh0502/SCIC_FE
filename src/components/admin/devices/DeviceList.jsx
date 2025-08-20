import React, { useState, useEffect } from "react";
import { getAllDevices } from "../../../utils/AdminHelper";
import DataTable from "react-data-table-component";
import DeviceListFilters from "./DeviceListFilter";
import { columns } from "./DeviceColumn";
import DeviceListActions from "./DeviceListActions";
import { toast } from "react-toastify";
import Loading from "../../Loading";
//import { useNavigate } from "react-router-dom";

const DeviceList = () => {
  //const navigate = useNavigate();

  const [devices, setDevices] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

//   const onDeviceRefresh = () => {
//     fetchDevices();
//   };

  const fetchDevices = async () => {
    setLoading(true);
    try {
      const devices = await getAllDevices(10,0);
      console.log("Devices:", devices);
      if (devices) {
        let sno = 1;
        const data = devices.map((device) => ({
          id: device.id.id,
          sno: sno++,
          name: device.name || "N/A",
          type: device.type || "N/A",
          label: device.label || "N/A",
          active: device.active,
          action: <DeviceListActions id={device.id.id}/>,
        }));
        setDevices(data);
        setFilteredDevices(data);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Không thể lấy danh sách thiết bị.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

//   const handleAddLecturer = () => {
//     navigate(`/admin-dashboard/lecturers/add-lecturer`);
//   };

  const filterDevices = (search) => {
    const data = devices.filter((device) => {
      const matchesSearch =
        device.type.toLowerCase().includes(search.toLowerCase()) ||
        device.label.toLowerCase().includes(search.toLowerCase());
      return matchesSearch;
    });
    setFilteredDevices(data);
  };

  useEffect(() => {
    filterDevices(searchText);
  }, [searchText]);

  if (loading)
    return (
      <Loading />
    );

  return (
    <div className="p-2 sm:p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="text-center">
        <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-5">Quản lý thiết bị</h3>
      </div>

      <DeviceListFilters
        searchText={searchText}
        handleSearchChange={handleSearchChange}
      />

      <div className="mt-4 sm:mt-5 w-full overflow-x-auto">
        <div className="min-w-[700px]">
          <DataTable columns={columns} data={filteredDevices} pagination responsive highlightOnHover striped />
        </div>
      </div>
    </div>
  );
};

export default DeviceList;
