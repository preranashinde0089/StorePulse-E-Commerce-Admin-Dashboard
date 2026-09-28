import React, { createContext, useContext, useState } from 'react';
import { storage } from '../services/storage';

const AuthContext = createContext(null);

export const DEFAULT_ADMIN = {
  name: 'Alex Morgan',
  email: 'admin@storepulse.io',
  role: 'Store Administrator',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Check saved session or default to logged in demo user for convenience if already set
    const saved = storage.getAuth();
    return saved || null;
  });

  const [isLoading, setIsLoading] = useState(false);

  const login = (email, password) => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setIsLoading(false);
        // Basic validation
        if (!email || !email.includes('@')) {
          reject(new Error('Please enter a valid email address.'));
          return;
        }
        if (!password || password.length < 6) {
          reject(new Error('Password must be at least 6 characters.'));
          return;
        }

        const userData = {
          name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'Administrator',
          email,
          role: 'Store Administrator',
          avatar: DEFAULT_ADMIN.avatar,
        };

        setUser(userData);
        storage.setAuth(userData);
        resolve(userData);
      }, 500);
    });
  };

  const quickDemoLogin = () => {
    setUser(DEFAULT_ADMIN);
    storage.setAuth(DEFAULT_ADMIN);
  };

  const logout = () => {
    setUser(null);
    storage.removeAuth();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        quickDemoLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
