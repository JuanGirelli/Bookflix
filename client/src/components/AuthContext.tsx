// src/components/AuthContext.tsx
import React, { createContext, useContext, useState } from 'react';

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  setUser: (user: string) => void; // Change `setuser` to `setUser` for consistency
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  const setUser = (user: string) => {
    localStorage.setItem('user', user);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
