// useLanguage.js
import { createContext, useState, useContext, useEffect } from "react";

// 1. Create context
const LanguageContext = createContext();

// 2. Create provider component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    try {
      const savedLang = localStorage.getItem("language");
      // Fallback to English (true) if nothing is stored or if parsing fails
      return savedLang !== null ? JSON.parse(savedLang) : true;
    } catch (error) {
      console.warn("Invalid language setting in localStorage. Falling back to default.");
      return true;
    }
  });

  // 3. Save language to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("language", JSON.stringify(language));
    } catch (error) {
      console.error("Failed to save language setting to localStorage:", error);
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// 4. Hook for easier access
export const useLanguage = () => useContext(LanguageContext);
