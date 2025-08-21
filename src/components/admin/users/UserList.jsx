import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";

import { getAllUsers } from "../../../utils/AdminHelper";
import { columns } from "./UserColumn";
import UserListActions from "./UserListActions";
import UserListFilters from "./UserListFilters";
import Loading from "../../Loading";
import AddUser from "./AddUser";
import UserDetailModal from "./UserDetailModal";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchtext, setSearchText] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showUserViewModal, setShowUserViewModal] = useState(false);

  const handleAddUser = () => setShowAddUserModal(true);
  const handleCloseAddModal = () => setShowAddUserModal(false);
  const handleViewUser = (id) => {
    setSelectedUserId(id);
    setShowUserViewModal(true);
  };
  const handleCloseUserViewModal = () => {
    setShowUserViewModal(false);
    setSelectedUserId(null);
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
            <UserListActions
              id={user.id}
              onUserRefresh={fetchUsers}
              handleViewUser={handleViewUser}
            />
          ),
        }));
        setUsers(data);
        setFilteredUsers(data);
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Không thể lấy dữ liệu người dùng"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearchChange = (e) => setSearchText(e.target.value);
  const handleRoleChange = (e) => setSelectedRole(e.target.value);

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
  }, [searchtext, selectedRole, users]);

  if (loading) return <Loading />;

  return (
    <div className="p-2 sm:p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="text-center">
        <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-5">
          Quản lý người dùng
        </h3>
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
          <DataTable
            columns={columns}
            data={filteredUsers}
            pagination
            responsive
            highlightOnHover
            striped
          />
        </div>
      </div>

      {/* Modal AddUser */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-4 sm:p-8 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={handleCloseAddModal}
            >
              ✖
            </button>
            <AddUser onClose={handleCloseAddModal} onUserRefresh={fetchUsers} />
          </div>
        </div>
      )}

      {/* Modal View User */}
      {showUserViewModal && (
        <UserDetailModal
          onClose={handleCloseUserViewModal}
          userId={selectedUserId}
          onUserUpdated={fetchUsers}
        />
      )}
    </div>
  );
};

export default UserList;
