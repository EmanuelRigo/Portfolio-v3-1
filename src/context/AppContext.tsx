"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import enMessages from '../../messages/en.json';
import esMessages from '../../messages/es.json';

export type Lang = 'ESP' | 'ENG';

// Use esMessages shape as the template type for messages
export type TranslationMessages = typeof esMessages;

interface AppContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  messages: TranslationMessages;
  hoveredIcon: string | null;
  setHoveredIcon: (icon: string | null) => void;
  hoveredTags: string[] | null;
  setHoveredTags: (tags: string[] | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ESP');
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [hoveredTags, setHoveredTags] = useState<string[] | null>(null);

  useState(() => {
    // A quick check that runs during initial render on client side to avoid double renders
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('emanuel_portfolio_lang');
      if (saved === 'ENG' || saved === 'ESP') {
        setLangState(saved as Lang);
      }
    }
  });

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('emanuel_portfolio_lang', newLang);
    }
  };

  // Select messages based on language
  const messages = lang === 'ENG' ? (enMessages as TranslationMessages) : esMessages;

  return (
    <AppContext.Provider value={{ 
      lang, 
      setLang, 
      messages, 
      hoveredIcon, 
      setHoveredIcon,
      hoveredTags,
      setHoveredTags
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
