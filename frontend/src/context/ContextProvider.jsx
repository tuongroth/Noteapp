import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const authContext = createContext();

// Hook để dùng context
export const useAuth = () => useContext(authContext);

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Login: lưu user sau khi login
  const login = (userData) => {
    setUser(userData);
  };

  // Logout: xóa token và user
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // Verify user khi load app
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return setUser(null);

        const res = await axios.get("https://noteapp-2wye.onrender.com/api/auth/verify"
, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          setUser(res.data.user); // set user nếu token hợp lệ
        } else {
          setUser(null); // token không hợp lệ
        }
      } catch (error) {
        console.log("Verify user error:", error.message);
        setUser(null);
      }
    };

    verifyUser();
  }, []);

  return (
    <authContext.Provider value={{ user, login, logout }}>
      {children}
    </authContext.Provider>
  );
};

export default ContextProvider;
