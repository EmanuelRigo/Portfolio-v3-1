"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import enMessages from "../../messages/en.json";
import esMessages from "../../messages/es.json";

export type Lang = "ESP" | "ENG";

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
  const [lang, setLangState] = useState<Lang>("ESP");

  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const [hoveredTags, setHoveredTags] = useState<string[] | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("emanuel_portfolio_lang");

    if (saved === "ESP" || saved === "ENG") {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);

    localStorage.setItem("emanuel_portfolio_lang", newLang);
  };

  const messages =
    lang === "ENG" ? (enMessages as TranslationMessages) : esMessages;

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        messages,
        hoveredIcon,
        setHoveredIcon,
        hoveredTags,
        setHoveredTags,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }

  return context;
}
