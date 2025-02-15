import React, { createContext, useState, useContext } from 'react';
import translations from '../utils/translations'; 

const languages = {
  en: 'English',
  fr: 'Français'
};

export const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // Par défaut en anglais

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations, languages }}>
      {children}
    </LanguageContext.Provider>
  );
};
