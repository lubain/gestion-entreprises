import { useState, useEffect, useCallback } from 'react';

/**
 * Hook pour gérer le basculement entre mode clair et sombre
 * 
 * @description Ce hook fournit une interface simple pour basculer entre
 * les modes clair et sombre, avec persistance dans localStorage et
 * détection automatique des préférences système.
 * 
 * @features
 * - Détection automatique des préférences système
 * - Persistance dans localStorage
 * - Synchronisation avec la classe 'dark' sur document.documentElement
 * - Interface simple pour basculer les thèmes
 * 
 * @example
 * ```tsx
 * const { isDarkMode, toggleTheme, setTheme } = useThemeToggle();
 * 
 * return (
 *   <button onClick={toggleTheme}>
 *     {isDarkMode ? '🌙' : '☀️'} {isDarkMode ? 'Mode sombre' : 'Mode clair'}
 *   </button>
 * );
 * ```
 */
export const useThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  /**
   * Détecte la préférence système pour le mode sombre
   */
  const getSystemPreference = useCallback((): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }, []);

  /**
   * Récupère le thème sauvegardé ou utilise la préférence système
   */
  const getSavedTheme = useCallback((): boolean => {
    if (typeof window === 'undefined') return false;
    
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') return true;
    if (savedTheme === 'light') return false;
    
    // Si aucune préférence sauvegardée, utiliser la préférence système
    return getSystemPreference();
  }, [getSystemPreference]);

  /**
   * Applique le thème au DOM et sauvegarde la préférence
   */
  const applyTheme = useCallback((dark: boolean) => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    
    setIsDarkMode(dark);
  }, []);

  /**
   * Bascule entre mode clair et sombre
   */
  const toggleTheme = useCallback(() => {
    applyTheme(!isDarkMode);
  }, [isDarkMode, applyTheme]);

  /**
   * Définit explicitement un thème
   */
  const setTheme = useCallback((theme: 'light' | 'dark' | 'system') => {
    if (theme === 'system') {
      applyTheme(getSystemPreference());
    } else {
      applyTheme(theme === 'dark');
    }
  }, [applyTheme, getSystemPreference]);

  /**
   * Initialisation du thème au montage du composant
   */
  useEffect(() => {
    const savedTheme = getSavedTheme();
    applyTheme(savedTheme);

    // Écouter les changements de préférence système
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      // Ne changer que si aucune préférence explicite n'est sauvegardée
      const savedTheme = localStorage.getItem('theme');
      if (!savedTheme || savedTheme === 'system') {
        applyTheme(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [getSavedTheme, applyTheme]);

  return {
    /** État actuel du mode sombre */
    isDarkMode,
    /** Fonction pour basculer entre les thèmes */
    toggleTheme,
    /** Fonction pour définir explicitement un thème */
    setTheme,
  };
};
