'use client';

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { translations, type Language } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isSpanish: boolean;
  isEnglish: boolean;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
}

export function LanguageProvider({ children, defaultLanguage = 'en' }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);

  // Check for stored language preference on mount
  useEffect(() => {
    const stored = localStorage.getItem('lending-living-language') as Language | null;
    if (stored && (stored === 'en' || stored === 'es')) {
      setLanguageState(stored);
    }
  }, []);

  // Toggle between English and Spanish
  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => {
      const next = prev === 'en' ? 'es' : 'en';
      localStorage.setItem('lending-living-language', next);
      return next;
    });
  }, []);

  // Set language explicitly
  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('lending-living-language', lang);
  }, []);

  // Translation function - supports dot notation (e.g., 'nav.home')
  const t = useCallback(
    (key: string): string => {
      const keys = key.split('.');
      let value: unknown = translations[language];

      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = (value as Record<string, unknown>)[k];
        } else {
          // Key not found, return the key itself as fallback
          return key;
        }
      }

      // Return the value if it's a string, otherwise return the key
      return typeof value === 'string' ? value : key;
    },
    [language]
  );

  const isSpanish = language === 'es';
  const isEnglish = language === 'en';

  return (
    <LanguageContext.Provider
      value={{
        language,
        toggleLanguage,
        setLanguage,
        t,
        isSpanish,
        isEnglish,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}

// Export the context for advanced use cases
export { LanguageContext };
export type { Language, LanguageContextType };
