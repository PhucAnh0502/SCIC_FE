import React, { useState, useEffect } from 'react'
import { getAllPermissions } from '../../../utils/AdminHelper'
import DataTable from 'react-data-table-component'
import { columns } from './PermissionListColumn'
import PermissionListActions from './PermissionListActions'
import PermissionListFilters from './PermissionsListFilters'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loading from '../../common/Loading'

const PermissionList = () => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [permissions, setPermissions] = useState([])
  const [filteredPermissions, setFilteredPermissions] = useState([])
  const [filterStartDate, setFilterStartDate] = useState("")
  const [filterEndDate, setFilterEndDate] = useState("")

  const onPermissionRefresh = () => {
    fetchPermissionList()
  }

  const fetchPermissionList = async () => {
    setLoading(true)
    try {
      const permissions = await getAllPermissions()
      
      if(permissions){
        let sno = 1
        const data = permissions.map((permission) => ({
          id : permission.id,
          sno : sno++,
          numOfUsers : permission.users.$values.length,
          numOfDevices : permission.deviceIds.$values.length,
          timeStart : new Date(permission.timeStart).toLocaleString("vi-VN"),
          timeEnd : new Date(permission.timeEnd).toLocaleString("vi-VN"),
          createdAt : new Date(permission.createdAt).toLocaleString("vi-VN"),
          action : <PermissionListActions id={permission.id} onPermissionRefresh={onPermissionRefresh}/>
        }))
        setPermissions(data)
        setFilteredPermissions(data)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Lỗi khi lấy danh sách phân quyền")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPermissionList()
  },[])

  const handleAddPermission = () => {
    navigate("/admin-dashboard/permissions/create-permission")
  }

  const filterPermission = (sDate, eDate) => {
    const data = permissions.filter((permission) => {
      const matchesStartDate =
        sDate === "" ||
        new Date(permission.timeStart).toLocaleString("vi-VN") >= sDate;
      const matchesEndDate =
        eDate === "" ||
        new Date(permission.timeEnd).toLocaleString("vi-VN") <= eDate;
      return (
        matchesStartDate &&
        matchesEndDate
      );
    });
    setFilteredPermissions(data);
  }

  useEffect(() => {
      filterPermission(filterStartDate, filterEndDate)
    },[filterStartDate, filterEndDate])

  if (loading)
    return (
      <Loading />
    );
  return (
    <div className="p-2 sm:p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="text-center">
        <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-5">Quản lý phân quyền</h3>
      </div>

      <PermissionListFilters
        filterStartDate={filterStartDate}
        filterEndDate={filterEndDate}
        onStartDateChange={(e) => setFilterStartDate(e.target.value)}
        onEndDateChange={(e) => setFilterEndDate(e.target.value)}
        handleAddPermission={handleAddPermission}
      />

      <div className="mt-4 sm:mt-5 w-full overflow-x-auto">
        <div className="min-w-[700px]">
          <DataTable
            columns={columns}
            data={filteredPermissions}
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
}

export default PermissionList