// import { jwtDecode } from 'jwt-decode';
// import React, { createContext, useContext, useMemo, useState } from 'react';

// const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };


// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(null);
//   const userObject = useMemo(() => {
//     if(token)
//       return jwtDecode(token)
//   return null
//   },[token]) 
  
//   const login = (userData) => {
//     // Perform login logic, set user data after successful login
//     setToken(userData);
//   };

//   const logout = () => {
//     // Clear user data on logout
//     setToken(null);
//     // Optionally, you can clear any tokens or data stored in localStorage/sessionStorage here
//   };

//   return (
//     <AuthContext.Provider value={{ token,userObject, login, logout, updateUser:setToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate(); // Get the navigate function
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const userObject = useMemo(() => {
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }, [token]);

  const login = (userData) => {
    setToken(userData);
    localStorage.setItem('token', userData);
    localStorage.setItem('loginTime', new Date().toISOString());
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('loginTime');
    // Redirect to the home page when logging out
    navigate('/');
  };

  const resetLogoutTimer = () => {
    localStorage.setItem('loginTime', new Date().toISOString());
  };

  useEffect(() => {
    const checkLogout = () => {
      const loginTime = localStorage.getItem('loginTime');
      if (loginTime) {
        const currentTime = new Date().getTime();
        const loginTimestamp = new Date(loginTime).getTime();
        const elapsedTime = currentTime - loginTimestamp;

        // Logout the user if more than 4 hours have passed
        if (elapsedTime > 4 * 60 * 60 * 1000) {
          logout();
        }
      }
    };

    // Check for logout every second
    const intervalId = setInterval(checkLogout, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [token, logout]);

  // Attach event listeners for user activity to reset the timer
  useEffect(() => {
    const handleUserActivity = () => {
      resetLogoutTimer();
    };

    // Attach event listeners for user activity events
    document.addEventListener('mousemove', handleUserActivity);
    document.addEventListener('keydown', handleUserActivity);

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener('mousemove', handleUserActivity);
      document.removeEventListener('keydown', handleUserActivity);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ token, userObject, login, logout, updateUser: setToken }}>
      {children}
    </AuthContext.Provider>
  );
};