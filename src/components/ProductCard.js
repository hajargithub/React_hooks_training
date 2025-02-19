import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { ThemeContext } from '../contexts/ThemeContext';
import { LanguageContext } from '../contexts/LanguageContext';
import { CartContext } from '../contexts/CartContext';

const ProductCard = ({ product }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { language, translations } = useContext(LanguageContext);
  const { addToCart } = useContext(CartContext);

  return (
    <Card className={`h-100 ${isDarkTheme ? 'bg-secondary  bg-gradient text-light' : 'bg-light'}`}>
      <Card.Img variant="top" src={product.thumbnail} alt={product.title} />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text>{translations[language].price}: {product.price}€</Card.Text>
        <Button onClick={() => addToCart(product)}>{translations[language].buy}</Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
