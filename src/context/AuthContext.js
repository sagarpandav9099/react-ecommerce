import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getLoggedInUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUserProfile,
} from "../utils/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const existingUser = getLoggedInUser();
    if (existingUser) {
      setUser(existingUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (username, password) => {
    const result = loginUser(username, password);
    if (result.success) {
      setUser({ username });
      setIsAuthenticated(true);
    }
    return result;
  };

  const register = (username, password) => {
    return registerUser(username, password);
  };

  const logout = () => {
    logoutUser();
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateProfile = (profileData) => {
    const updatedUser = { ...user, ...profileData };
    setUser(updatedUser);
    updateUserProfile(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, register, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
