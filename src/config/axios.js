import axios from "axios";
import { toast } from "react-toastify";
import env from "./env";
import { getBeToken, getTbToken } from "./token"; // đảm bảo hàm này có trong token.js

// ===== Instance cho Backend API =====
const beInstance = axios.create({
  baseURL: env.BE_API_PATH,
});

beInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${getBeToken()}`;
    return config;
  },
  (error) => Promise.reject(error)
);

beInstance.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
  },
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 ||
        error.response.data?.message?.toLowerCase().includes("jwt expired") ||
        error.response.data?.message?.toLowerCase().includes("unauthorized"))
    ) {
      toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!");
      sessionStorage.clear();
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    }
    return Promise.reject(error?.response?.data || error);
  }
);

// ===== Instance cho ThingsBoard API =====
const tbInstance = axios.create({
  baseURL: env.TB_API_PATH,
});

tbInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${getTbToken()}`;
    return config;
  },
  (error) => Promise.reject(error)
);

tbInstance.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
  },
  (error) => {
    toast.error(
      error.response?.data?.message || "Có lỗi xảy ra với ThingsBoard API"
    );
    return Promise.reject(error?.response?.data || error);
  }
);

export { beInstance, tbInstance };
