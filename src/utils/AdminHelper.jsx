import axios from "axios";
import env from "../config/env.js";
import { getBeToken, getTbToken } from "../config/token.js";
import { toast } from "react-toastify";

export const getAllUsers = async () => {
  let users;
  try {
    const response = await axios.get(`${env.BE_API_PATH}/Admin/list-user`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    if (response.status === 200) {
      users = response.data.$values;
      toast.success("Lấy danh sách người dùng thành công!");
    }
  } catch (err) {
    toast.error(err.response?.data?.Message || "Không thể lấy danh sách người dùng");
  }
  return users;
};

export const getDefaultUsers = async () => {
  let defaultUsers;
  try {
    const response = await axios.get(
      `${env.BE_API_PATH}/User/get-defualt-user`,
      {
        headers: {
          Authorization: `Bearer ${getBeToken()}`,
        },
      }
    );
    if (response.status === 200) {
      defaultUsers = response.data.$values;
      toast.success("Lấy thông tin người dùng mặc định thành công!");
    }
  } catch (err) {
    toast.error(err.response?.data?.Message || "Không thể lấy thông tin người dùng");
  }
  return defaultUsers;
};

export const getAllStudents = async () => {
  let users;
  try {
    const response = await axios.get(`${env.BE_API_PATH}/Admin/list-student`, {
      headers: {
        Authorization: `Bearer ${getBeToken()}`,
      },
    });
    if (response.status === 200) {
      users = response.data.$values;
      toast.success("Lấy danh sách sinh viên thành công!");
    }
  } catch (err) {
    toast.error(err.response?.data?.Message || "Không thể lấy danh sách sinh viên");
  }
  return users;
};

export const getAllLecturers = async () => {
  let lecturers;
  try {
    const response = await axios.get(`${env.BE_API_PATH}/Admin/list-lecturer`, {
      headers: {
        Authorization: `Bearer ${getBeToken()}`,
      },
    });
    if (response.status === 200) {
      lecturers = response.data.$values;
      toast.success("Lấy danh sách giảng viên thành công!");
    }
  } catch (err) {
    toast.error(err.response?.data?.Message || "Không thể lấy danh sách giảng viên");
  }
  return lecturers;
};

export const getAttendancesList = async () => {
  let attendanceList;
  try {
    const response = await axios.get(
      `${env.BE_API_PATH}/Attendance/list-attendance`,
      {
        headers: {
          Authorization: `Bearer ${getBeToken()}`,
        },
      }
    );
    if (response.status === 200) {
      attendanceList = response.data.$values;
      toast.success("Lấy danh sách điểm danh thành công!");
    } else {
      return [];
    }
  } catch (err) {
    toast.error(err.response?.data?.Message || "Không thể lấy danh sách điểm danh");
  }
  return attendanceList;
};

export const getAllDevices = async (pageSize, page) => {
  //pageSize : Maximum amount of entities in a one page
  //page : Sequence number of page starting from 0
  let deviceList;
  try {
    const response = await axios.get(
      `${env.TB_API_PATH}/tenant/deviceInfos?pageSize=${pageSize}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${getTbToken()}`,
        },
      }
    );
    if (response.status === 200) {
      deviceList = response.data.data;
      toast.success("Lấy danh sách thiết bị thành công!");
    } else {
      return [];
    }
  } catch (err) {
    toast.error(err.response?.data?.message || "Không thể lấy danh sách thiết bị");
  }
  return deviceList;
};

export const getDeviceById = async (deviceId) => {
  let device;
  try {
    const response = await axios.get(`${env.TB_API_PATH}/device/info/${deviceId}`,{
      headers : {
        Authorization : `Bearer ${getTbToken()}`
      }
    })
    if(response.status === 200){
      device = response.data;
      toast.success("Lấy thông tin thiết bị thành công!");
    } else {
      return {}
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Không thể lấy thông tin thiết bị")
  }
  return device
}

export const getAllPermissions = async () => {
  let permissions;
  try {
    const response = await axios.get(
      `${env.BE_API_PATH}/Permission/list-permission`,
      {
        headers: {
          Authorization: `Bearer ${getBeToken()}`,
        },
      }
    );
    if (response.status === 200) {
      permissions = response.data.$values;
      toast.success("Lấy danh sách phân quyền thành công!");
    } else {
      return [];
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Không thể lấy thông tin phân quyền");
  }
  return permissions;
};
