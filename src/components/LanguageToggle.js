import React, { useContext } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Dropdown } from 'react-bootstrap';
import { ThemeContext } from '../contexts/ThemeContext';


const LanguageToggle = () => {
  const { language, setLanguage, languages } = useLanguage();
 const { isDarkTheme } = useContext(ThemeContext);
 return (
    <Dropdown>
      <Dropdown.Toggle 
        variant={isDarkTheme ? 'dark' : 'light'} // Correction du style
        
      >
        {languages[language]}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {Object.keys(languages).map((lang) => (
          <Dropdown.Item key={lang} onClick={() => setLanguage(lang)}>
            {languages[lang]}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageToggle;
