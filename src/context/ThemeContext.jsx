import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { STORAGE_KEYS } from '../data/constants';
import api from '../hooks/useApi';

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEYS.THEME);
      if (stored) return stored;
      // Safe matchMedia check - guard against SSR/unavailable
      if (typeof window !== 'undefined' && window.matchMedia) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
      }
      return 'light';
    } catch {
      return 'light';
    }
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
    try {
      window.localStorage.setItem(STORAGE_KEYS.THEME, theme);
    } catch {
      // localStorage unavailable
    }
    setMounted(true);
  }, [theme]);

  useEffect(() => {
    const token = localStorage.getItem('mindpulse-auth-token');
    if (token) {
      api.patch('/auth/me', { theme }).catch(() => {});
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
