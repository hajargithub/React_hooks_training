import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { ThemeContext } from '../App';

const ProductCard = ({ product }) => {
  const { isDarkTheme } = useContext(ThemeContext);

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
          Prix: {product.price}€
        </Card.Text>
        <Button variant={isDarkTheme ? "outline-light" : "primary"} className="w-100 mt-auto">
          Acheter
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
