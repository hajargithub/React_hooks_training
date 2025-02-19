import React, { useContext, useState } from 'react';
import ProductList from './ProductList';
import ProductSearch from './ProductSearch';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { LanguageContext } from '../contexts/LanguageContext';
import { ThemeContext } from '../contexts/ThemeContext';

const AppContent = () => {
  const { language, translations } = useContext(LanguageContext);
  const { isDarkTheme } = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className={`${isDarkTheme ? 'bg-dark text-light' : 'bg-light'}`} style={{ minHeight: "100vh" }}>
    
      <main className="container py-4">
        <ProductSearch onSearch={setSearchTerm} />
        <ProductList searchTerm={searchTerm} />
      </main>
    </div>
  );
};

export default AppContent;
