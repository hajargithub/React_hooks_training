import React, { useContext } from 'react';
import { ThemeContext } from '../App';
import { Button } from 'react-bootstrap';
import { LanguageContext } from '../contexts/LanguageContext';

const ThemeToggle = () => {
  const { isDarkTheme, setIsDarkTheme } = useContext(ThemeContext);
  const { language, translations } = useContext(LanguageContext);
  return (
    <Button
      onClick={() => setIsDarkTheme(!isDarkTheme)}
      className={`px-5 py-2 rounded btn-sm ${
        isDarkTheme 
          ? 'bg-dark text-light border border-light' 
          : 'bg-light text-dark border border-dark'
      }`}
    >
      {isDarkTheme ? ` ${translations[language].lightMode}` :  `${translations[language].darkMode}`}
    </Button>
  );
};

export default ThemeToggle;