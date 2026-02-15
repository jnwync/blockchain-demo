import { useState, useEffect, useCallback } from 'react';

export type Theme = 'light' | 'dark' | 'system';

interface UseThemeReturn {
  theme: Theme;
  actualTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

/**
 * Custom hook for managing theme (light/dark mode)
 * Persists theme preference to localStorage
 * Supports system preference detection
 */
export function useTheme(): UseThemeReturn {
  const [theme, setThemeState] = useState<Theme>('system');
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light');

  // Get system preference
  const getSystemTheme = useCallback((): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }, []);

  // Calculate actual theme based on preference and system
  const calculateActualTheme = useCallback((themePreference: Theme): 'light' | 'dark' => {
    if (themePreference === 'system') {
      return getSystemTheme();
    }
    return themePreference;
  }, [getSystemTheme]);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const stored = localStorage.getItem('theme') as Theme | null;
    const initialTheme = stored || 'system';
    setThemeState(initialTheme);
    setActualTheme(calculateActualTheme(initialTheme));
  }, [calculateActualTheme]);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === 'undefined' || theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      setActualTheme(getSystemTheme());
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [theme, getSystemTheme]);

  // Apply theme to document
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark');
    
    // Add current theme class
    root.classList.add(actualTheme);
    
    // Update color-scheme for native browser elements
    root.style.colorScheme = actualTheme;
  }, [actualTheme]);

  // Set theme and persist to localStorage
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    setActualTheme(calculateActualTheme(newTheme));
    localStorage.setItem('theme', newTheme);
  }, [calculateActualTheme]);

  // Toggle between light and dark (skips system)
  const toggleTheme = useCallback(() => {
    if (actualTheme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, [actualTheme, setTheme]);

  return {
    theme,
    actualTheme,
    setTheme,
    toggleTheme,
  };
}
