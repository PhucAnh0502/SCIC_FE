import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Regiser from "./components/auth/Regiser";
import ForgotPassword from "./components/auth/ForgotPassword";
import ChangePassword from "./components/auth/ChangePassword";
import PrivateRoutes from "./routes/PrivateRoutes";
import RoleBaseRoutes from "./routes/RoleBaseRoutes";
import AdminDashboard from "./pages/AdminDashboard";
import UserList from "./components/admin/users/UserList";
import AddUser from "./components/admin/users/AddUser";
import UserDetail from "./components/admin/users/UserDetail";
import StudentList from "./components/admin/students/StudentList";
import AddStudent from "./components/admin/students/AddStudent";
import StudentDetail from "./components/admin/students/StudentDetail";
import Setting from "./components/admin/settings/Setting";
import AttendanceList from "./components/admin/attendance/AttendanceList";
import AddAttendance from "./components/admin/attendance/AddAttendance";
import AttendanceDetail from "./components/admin/attendance/AttendanceDetail";
import PermissionList from "./components/admin/permissions/PermissionList";
import PermissionDetail from "./components/admin/permissions/PermissionDetail";
import CreatePermission from "./components/admin/permissions/CreatePermission";
import LecturerList from "./components/admin/lecturers/LecturerList";
import LecturerDetail from "./components/admin/lecturers/LecturerDetail";
import AddLecturer from "./components/admin/lecturers/AddLecturer";
import DeviceList from "./components/admin/devices/DeviceList";
import DeviceDetail from "./components/admin/devices/DeviceDetail";
import AdminSummary from "./components/admin/summary/AdminSummary";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Regiser />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Admin */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes allowedRoles={["admin"]}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          {/* Overview Dashboard */}
          <Route index element={<AdminSummary />}></Route>

          {/* Users */}
          <Route
            path="/admin-dashboard/users"
            element={<UserList onClose={() => window.history.back()} />}
          />
          <Route
            path="/admin-dashboard/users/add-user"
            element={<AddUser onClose={() => window.history.back()} />}
          />
          <Route
            path="/admin-dashboard/users/:userId"
            element={<UserDetail onClose={() => window.history.back()} />}
          />

          {/* Students */}
          <Route
            path="/admin-dashboard/students"
            element={<StudentList onClose={() => window.history.back()} />}
          />
          <Route
            path="/admin-dashboard/students/:userId"
            element={<StudentDetail onClose={() => window.history.back()} />}
          />
          <Route
            path="/admin-dashboard/students/add-student"
            element={<AddStudent onClose={() => window.history.back()} />}
          />

          {/* Lecturers */}
          <Route
            path="/admin-dashboard/lecturers"
            element={<LecturerList onClose={() => window.history.back()} />}
          />
          <Route
            path="/admin-dashboard/lecturers/:userId"
            element={<LecturerDetail onClose={() => window.history.back()} />}
          />
          <Route
            path="/admin-dashboard/lecturers/add-lecturer"
            element={<AddLecturer onClose={() => window.history.back()} />}
          />

          {/* Devices */}
          <Route
            path="/admin-dashboard/devices"
            element={<DeviceList onClose={() => window.history.back()} />}
          />
          <Route
            path="/admin-dashboard/devices/:id"
            element={<DeviceDetail onClose={() => window.history.back()} />}
          />

          {/* Attendance */}
          <Route
            path="/admin-dashboard/attendances"
            element={<AttendanceList onClose={() => window.history.back()} />}
          />

          <Route
            path="/admin-dashboard/attendances/:attendanceId"
            element={<AttendanceDetail onClose={() => window.history.back()} />}
          />

          <Route
            path="/admin-dashboard/attendances/create-attendance"
            element={<AddAttendance onClose={() => window.history.back()} />}
          />

          {/* Permission */}
          <Route
            path="/admin-dashboard/permissions"
            element={<PermissionList onClose={() => window.history.back()} />}
          />

          <Route
            path="/admin-dashboard/permissions/:permissionId"
            element={<PermissionDetail onClose={() => window.history.back()} />}
          />

          <Route
            path="/admin-dashboard/permissions/create-permission"
            element={<CreatePermission onClose={() => window.history.back()} />}
          />

          {/* Setting */}
          <Route
            path="/admin-dashboard/setting"
            element={<Setting onClose={() => window.history.back()} />}
          />

          <Route
            path="/admin-dashboard/setting/change-password"
            element={<ChangePassword onClose={() => window.history.back()}/>}
          />
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} closeOnClick pauseOnHover />
    </BrowserRouter>
  );
}

export default App;
