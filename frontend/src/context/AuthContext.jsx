import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Ambil token dan role dari localStorage saat aplikasi dimuat
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("userRole");
    if (storedToken && storedRole) {
      setToken(storedToken);
      setUserRole(storedRole);
    }
  }, []);

  const login = (token, role) => {
    setToken(token);
    setUserRole(role);
    // Simpan token dan role di localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("userRole", role);
  };

  const logout = () => {
    setToken(null);
    setUserRole(null);
    // Hapus token dan role dari localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
  };

  return (
    <AuthContext.Provider value={{ userRole, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
