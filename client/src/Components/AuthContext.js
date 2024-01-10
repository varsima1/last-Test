import { jwtDecode } from 'jwt-decode';
import React, { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};


export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const userObject = useMemo(() => {
    if(token)
      return jwtDecode(token)
  return null
  },[token]) 
  
  const login = (userData) => {
    // Perform login logic, set user data after successful login
    setToken(userData);
  };

  const logout = () => {
    // Clear user data on logout
    setToken(null);
    // Optionally, you can clear any tokens or data stored in localStorage/sessionStorage here
  };

  return (
    <AuthContext.Provider value={{ token,userObject, login, logout, updateUser:setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
