import React, { useState, useContext, useEffect } from 'react';

import useDebounce from '../hooks/useDebounce';
import { Form, InputGroup } from 'react-bootstrap';
import { LanguageContext } from '../contexts/LanguageContext';
import { ThemeContext } from '../contexts/ThemeContext';

const ProductSearch = ({onSearch }) => {
  if (!onSearch) {
    console.error("Erreur: onSearch n'a pas été fourni à ProductSearch");
  }
  const { language, translations } = useContext(LanguageContext);

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const { isDarkTheme } = useContext(ThemeContext);
  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  
  return (
    <InputGroup  className="mb-4">
      <Form.Control
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder= {translations[language].searchPlaceholder}
        className={ isDarkTheme ? 'bg-secondary bg-gradient text-light' : ''}
      />
    </InputGroup >
  );
};

export default ProductSearch;