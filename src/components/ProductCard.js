import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { ThemeContext } from '../App';
import { LanguageContext } from '../contexts/LanguageContext';

const ProductCard = ({ product }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { language, translations } = useContext(LanguageContext);

  return (
    <Card 
      className={`h-100 shadow border-0 ${isDarkTheme ? 'bg-secondary bg-gradient text-light' : 'bg-white text-dark'}`}
    >
      <Card.Img 
        variant="top" 
        src={product.thumbnail} 
        alt={product.title}
        className="p-3"
        style={{ objectFit: 'contain', maxHeight: '180px' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-center">{product.title}</Card.Title>
        <Card.Text className="text-center" >
          {product.description}
        </Card.Text>
        <Card.Text className="fw-bold text-center">
        {translations[language].price}: {product.price}€
        </Card.Text>
        <Button variant={isDarkTheme ? "outline-light" : "primary"} className="w-100 mt-auto">
        {translations[language].buy}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
