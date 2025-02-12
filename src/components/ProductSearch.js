import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../App';
import useDebounce from '../hooks/useDebounce';
import { Form, InputGroup } from 'react-bootstrap';

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
    <InputGroup  className="mb-4">
      <Form.Control
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Rechercher un produit..."
        className={ isDarkTheme ? 'bg-secondary bg-gradient text-light' : ''}
      />
    </InputGroup >
  );
};

export default ProductSearch;