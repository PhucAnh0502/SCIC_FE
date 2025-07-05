import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import env from "../config/env.js";
import { toast } from "react-toastify";

const userContext = createContext();

function AuthContext({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const verifyUser = async () => {
    setLoading(true);
    try {
      const userId = sessionStorage.getItem("userId");
      const sessionToken = sessionStorage.getItem("token")
      if (sessionToken && userId) {
        const response = await axios.get(
          `${env.BE_API_PATH}/User/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${sessionToken}`,
            },
          }
        );
        if (response.status === 200) {
          toast.success("Xác thực người dùng thành công!");
          setUser(response.data);
          setLoading(false);
        }
      } else {
        setUser(null);
        setLoading(false);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.Message || "Xác thực người dùng thất bại. Vui lòng đăng nhập lại."
      );
      if (error.response?.data) {
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const login = async () => {
    await verifyUser()
    toast.success("Đăng nhập thành công!");
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("role");
    toast.info("Đăng xuất thành công!");
  };

  return (
    <userContext.Provider value={{ user, login, logout, loading }}>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <p className="text-lg text-blue-600">
            Đang tải thông tin người dùng...
          </p>
        </div>
      ) : (
        children
      )}
    </userContext.Provider>
  );
}

export const useAuth = () => useContext(userContext);
export default AuthContext;
