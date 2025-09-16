// src/contexts/AuthContext.js

import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import axios from 'axios';
// 1. Create the Context
const AuthContext = createContext(null);

// 2. Create the AuthProvider Component
export function AuthProvider({ children }) {

  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      // Get the token from localStorage
      const token = localStorage.getItem('userToken');

      if (!token) {
        setUserInfo(null);
        setIsLoading(false);
        return;
      }

      try {
        // Correct URL and Authorization header
        const response = await axios.get('http://127.0.0.1:8000/api/me', {
          headers: {
            'Content-Type': 'application/ld+json',
            // Correct template literal syntax
            'Authorization': 'Bearer '+ token,
          },
        });

        setUserInfo(response.data);
      } catch (err) {
        // Handle errors, e.g., token expired
        console.error("Failed to fetch user:", err);
        setError(err.message);
        // localStorage.removeItem('userToken'); // Clean up bad token
      } finally {
        setIsLoading(false);
      }
    };

    // Call the function we defined
    fetchUser();
  }, []); 

  const value = useMemo(() => ({
    userInfo,
    isLoading,
    error,
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