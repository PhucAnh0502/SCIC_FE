import { beInstance, tbInstance } from "../config/axios";
import { toast } from "react-toastify";

export const getAllUsers = async () => {
  try {
    const res = await beInstance.get("/Admin/list-user");
    toast.success("Lấy danh sách người dùng thành công!");
    return res.$values;
  } catch (err) {
    toast.error(err?.Message || "Không thể lấy danh sách người dùng");
    return [];
  }
};

export const getUserById = async (userId) => {
  try {
    const res = await beInstance.get(`/User/${userId}`);
    toast.success("Lấy thông tin người dùng thành công!");
    return res
  } catch (error) {
    toast.error(error?.message || "Không thể lấy thông tin người dùng");
    return {};   
  }
}

export const getDefaultUsers = async () => {
  try {
    const res = await beInstance.get("/User/get-defualt-user");
    return res.$values;
  } catch (err) {
    toast.error(err?.Message || "Không thể lấy thông tin người dùng");
    return [];
  }
};

export const getAllStudents = async () => {
  try {
    const res = await beInstance.get("/Admin/list-student");
    toast.success("Lấy danh sách sinh viên thành công!");
    return res.$values;
  } catch (err) {
    toast.error(err?.Message || "Không thể lấy danh sách sinh viên");
    return [];
  }
};

export const getAllLecturers = async () => {
  try {
    const res = await beInstance.get("/Admin/list-lecturer");
    toast.success("Lấy danh sách giảng viên thành công!");
    return res.$values;
  } catch (err) {
    toast.error(err?.Message || "Không thể lấy danh sách giảng viên");
    return [];
  }
};

export const getAttendancesList = async () => {
  try {
    const res = await beInstance.get("/Attendance/list-attendance");
    toast.success("Lấy danh sách điểm danh thành công!");
    return res.$values;
  } catch (err) {
    toast.error(err?.Message || "Không thể lấy danh sách điểm danh");
    return [];
  }
};

export const getAllPermissions = async () => {
  try {
    const res = await beInstance.get("/Permission/list-permission");
    toast.success("Lấy danh sách phân quyền thành công!");
    return res.$values;
  } catch (err) {
    toast.error(err?.Message || "Không thể lấy thông tin phân quyền");
    return [];
  }
};

export const getAllDevices = async (pageSize, page) => {
  try {
    const res = await tbInstance.get("/tenant/deviceInfos", {
      params: { pageSize, page },
    });
    toast.success("Lấy danh sách thiết bị thành công!");
    return res.data;
  } catch (err) {
    toast.error(err?.message || "Không thể lấy danh sách thiết bị");
    return [];
  }
};

export const getDeviceById = async (deviceId) => {
  try {
    const res = await tbInstance.get(`/device/info/${deviceId}`);
    toast.success("Lấy thông tin thiết bị thành công!");
    return res;
  } catch (err) {
    toast.error(err?.message || "Không thể lấy thông tin thiết bị");
    return {};
  }
};

export const getAllLogs = async () => {
  try {
    const res = await beInstance.get("AttendanceLog/list-log");
    toast.success("Lấy nhật ký vào ra thành công!");
    return res.$values;
  } catch (err) {
    toast.error(err?.message || "Không thể lấy nhật ký vào ra");
    return [];
  }
};
