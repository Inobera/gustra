import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "lt" | "en";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (lt: ReactNode, en: ReactNode) => ReactNode;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "lt",
  setLang: () => {},
  t: (lt) => lt,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("lt");

  const t = (lt: ReactNode, en: ReactNode): ReactNode => (lang === "lt" ? lt : en);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
