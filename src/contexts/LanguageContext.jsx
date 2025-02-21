import React, { createContext, useContext, useState } from "react";

// Create Language Context
const LanguageContext = createContext();

// Provider to wrap your app and provide language state
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en"); // Default language is English

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "en" ? "mr" : "en")); // Toggle between English and Marathi
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use language context
export const useLanguage = () => {
  return useContext(LanguageContext);
};
