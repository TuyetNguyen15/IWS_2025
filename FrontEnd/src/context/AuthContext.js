// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();
  
    const login = async (username, password) => {
      try {
        const response = await axios.post('login???', 
          `username=${username}&password=${password}`,
          {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            withCredentials: true
          }
        );
        
        setUser({ username }); 
        setIsAuthenticated(true);
        setIsAdmin(false); 
        navigate('/');
      } catch (error) {
        throw error.response?.data?.message || 'Login failed';
      }
    };

  const register = async (userData) => {
    try {
      await axios.post('/auth/register', userData);
      navigate('/auth/login?registerSuccess=true');
    } catch (error) {
      throw error.response.data;
    }
  };

  const logout = async () => {
    try {
      await axios.post('/logout');
      setUser(null);
      setIsAuthenticated(false);
      setIsAdmin(false);
      navigate('/?logout=true');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);