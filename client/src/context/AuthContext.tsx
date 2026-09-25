import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (credentials: { email: string; password: string }) => Promise<User>;
  register: (data: any) => Promise<User>;
  logout: () => void;
  updateProfile: (data: any) => Promise<void>;
  refreshUser: () => Promise<void>;
  isAdmin: boolean;
  isEmployee: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('intellimeet_token'));
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refreshUser = async () => {
    const storedToken = localStorage.getItem('intellimeet_token');
    if (!storedToken) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await api.getMe();
      if (res.success && res.user) {
        setUser(res.user);
      } else {
        logout();
      }
    } catch (err: any) {
      console.warn('Session verification failed:', err.message);
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (credentials: { email: string; password: string }): Promise<User> => {
    setError(null);
    try {
      const res = await api.login(credentials);
      if (res.success && res.token && res.user) {
        localStorage.setItem('intellimeet_token', res.token);
        setToken(res.token);
        setUser(res.user);
        return res.user;
      }
      throw new Error(res.message || 'Login failed');
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
      throw err;
    }
  };

  const register = async (data: any): Promise<User> => {
    setError(null);
    try {
      const res = await api.register(data);
      if (res.success && res.token && res.user) {
        localStorage.setItem('intellimeet_token', res.token);
        setToken(res.token);
        setUser(res.user);
        return res.user;
      }
      throw new Error(res.message || 'Registration failed');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
      throw err;
    }
  };

  const updateProfile = async (data: any) => {
    try {
      const res = await api.updateProfile(data);
      if (res.success && res.user) {
        setUser(res.user);
      }
    } catch (err: any) {
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('intellimeet_token');
    setToken(null);
    setUser(null);
    setError(null);
  };

  const isAdmin = user?.role === 'admin';
  const isEmployee = user?.role === 'employee';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        login,
        register,
        logout,
        updateProfile,
        refreshUser,
        isAdmin,
        isEmployee,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
