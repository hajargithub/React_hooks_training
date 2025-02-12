import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../App';
import useDebounce from '../hooks/useDebounce';

const ProductSearch = ({onSearch }) => {
  if (!onSearch) {
    console.error("Erreur: onSearch n'a pas été fourni à ProductSearch");
  }
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { isDarkTheme } = useContext(ThemeContext);
  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);


  // TODO: Exercice 2.1 - Utiliser le LanguageContext
  
  // TODO: Exercice 1.2 - Utiliser le hook useDebounce
  
  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Rechercher un produit..."
        className={`form-control ${isDarkTheme ? 'bg-dark text-light' : ''}`}
      />
    </div>
  );
};

export default ProductSearch;