import { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import api from '../hooks/useApi';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('mindpulse-auth-user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('mindpulse-auth-token'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validate = async () => {
      const storedToken = localStorage.getItem('mindpulse-auth-token');
      if (!storedToken) {
        setIsLoading(false);
        return;
      }
      try {
        const { data } = await api.get('/auth/me');
        setUser(data.user);
        localStorage.setItem('mindpulse-auth-user', JSON.stringify(data.user));
      } catch {
        localStorage.removeItem('mindpulse-auth-token');
        localStorage.removeItem('mindpulse-auth-user');
        setUser(null);
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    };
    validate();
  }, []);

  const login = useCallback(async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('mindpulse-auth-token', data.token);
    localStorage.setItem('mindpulse-auth-user', JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
    return data.user;
  }, []);

  const register = useCallback(async (name, email, password) => {
    const { data } = await api.post('/auth/register', { name, email, password });
    localStorage.setItem('mindpulse-auth-token', data.token);
    localStorage.setItem('mindpulse-auth-user', JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
    return data.user;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('mindpulse-auth-token');
    localStorage.removeItem('mindpulse-auth-user');
    setUser(null);
    setToken(null);
  }, []);

  const updateProfile = useCallback(async (updates) => {
    const { data } = await api.patch('/auth/me', updates);
    setUser(data.user);
    localStorage.setItem('mindpulse-auth-user', JSON.stringify(data.user));
    return data.user;
  }, []);

  const value = useMemo(() => ({
    user, token, isLoading, login, register, logout, updateProfile,
  }), [user, token, isLoading, login, register, logout, updateProfile]);

  return (
    <AuthContext.Provider value={value}>
      {children}
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
