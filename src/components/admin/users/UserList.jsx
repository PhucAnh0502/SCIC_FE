import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../../utils/AdminHelper";
import { columns } from "./UserColumn";
import DataTable from "react-data-table-component";
import UserListActions from "./UserListActions";
import UserListFilters from "./UserListFilters";
import { toast } from "react-toastify";
import Loading from "../../Loading";

const UserList = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchtext, setSearchText] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const onUserRefresh = () => {
    fetchUsers();
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const users = await getAllUsers();
      if (users) {
        let sno = 1;
        const data = users.map((user) => ({
          id: user.id,
          sno: sno++,
          userName: user.userName || "N/A",
          fullName: user.fullName || "N/A",
          idNumber: user.idNumber || "N/A",
          email: user.email || "N/A",
          userRoles: user.userRoles?.$values || [],
          action: (
            <UserListActions id={user.id} onUserRefresh={onUserRefresh} />
          ),
        }));
        setUsers(data);
        setFilteredUsers(data);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Không thể lấy dữ liệu người dùng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleAddUser = () => {
    navigate(`/admin-dashboard/users/add-user`);
  };

  const filterUsers = (search, role) => {
  const data = users.filter((user) => { 
    const matchesSearch = user.fullName
      .toLowerCase()
      .includes(search.toLowerCase());
    const roleNames = user.userRoles || []; 
    const matchesRole = role === "" || roleNames.includes(role);
    return matchesSearch && matchesRole;
  });
  setFilteredUsers(data);
};


  useEffect(() => {
    filterUsers(searchtext, selectedRole);
  }, [searchtext, selectedRole]);

  if (loading)
    return (
      <Loading />
    );

  return (
    <div className="p-2 sm:p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="text-center">
        <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-5">Quản lý người dùng</h3>
      </div>

      <UserListFilters
        searchtext={searchtext}
        selectedRole={selectedRole}
        handleSearchChange={handleSearchChange}
        handleRoleChange={handleRoleChange}
        handleAddUser={handleAddUser}
      />

      <div className="mt-4 sm:mt-5 w-full overflow-x-auto">
        <div className="min-w-[700px]">
          <DataTable columns={columns} data={filteredUsers} pagination responsive highlightOnHover striped />
        </div>
      </div>
    </div>
  );
};

export default UserList;
