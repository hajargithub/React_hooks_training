import React, { useContext } from 'react';
import { ThemeContext } from '../App';
import { Button } from 'react-bootstrap';

const ThemeToggle = () => {
  const { isDarkTheme, setIsDarkTheme } = useContext(ThemeContext);
  
  return (
    <Button
      onClick={() => setIsDarkTheme(!isDarkTheme)}
      className={`px-5 py-2 rounded btn-sm ${
        isDarkTheme 
          ? 'bg-dark text-light border border-light' 
          : 'bg-light text-dark border border-dark'
      }`}
    >
      {isDarkTheme ? 'Mode Clair' : 'Mode Sombre'}
    </Button>
  );
};

export default ThemeToggle;