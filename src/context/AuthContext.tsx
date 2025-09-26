import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('userToken'));

  const fetchUser = async (token) => {
    if (!token) {
      setUserInfo(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get('https://antiquewhite-bee-570664.hostingersite.com/symfony/public/api/me', {
        headers: {
          'Content-Type': 'application/ld+json',
          Authorization: 'Bearer ' + token,
        },
      });
      setUserInfo(response.data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch user:', err);
      setError(err.message);
      setUserInfo(null);
      localStorage.removeItem('userToken');
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser(token);
  }, [token]);

  const login = (newToken) => {
    localStorage.setItem('userToken', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('userToken');
    setUserInfo(null);
    setToken(null);
  };

  const value = useMemo(() => ({
    userInfo,
    isLoading,
    error,
    isAuthenticated: !!userInfo,
    login,
    logout,
  }), [userInfo, isLoading, error]);

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
