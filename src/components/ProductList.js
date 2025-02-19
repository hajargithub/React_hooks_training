import React, { useContext, useState } from 'react';
import { ThemeContext } from '../App';
import useProductSearch from '../hooks/useProductSearch';
import SpinnerComponent from './SpinnerComponent';
import { Col, Row } from 'react-bootstrap';
import ProductCard from './ProductCard';
import { LanguageContext } from '../contexts/LanguageContext';

const ProductList = ({ searchTerm }) => {
    const { language, translations } = useContext(LanguageContext);
 
  const { isDarkTheme } = useContext(ThemeContext);
  const {  products, loading, error, } = useProductSearch(searchTerm);
  
  if (loading) return <SpinnerComponent />
  
  if (error) return (
    <div className="alert alert-danger" role="alert">
      Erreur: {error}
    </div>
  );
  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {products.length === 0 && (
        <Col className="text-center">
          <p> {translations[language].productsNotFound} "<strong>{searchTerm}</strong>"</p>
          console
        </Col>
      )}

      {products.map((product) => (
        <Col key={product.id}>
          <ProductCard product={product} />
        </Col>
      ))}
    </Row>
  );
};
  /* return (
    <div>  
      {loading && (
        <div className="text-center my-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          Erreur: {error}
        </div>
      )}

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {products.map(product => (
          <div key={product.id} className="col">
            <div className={`card h-100 ${isDarkTheme ? 'bg-dark text-light' : ''}`}>
              {product.thumbnail && (
                <img 
                  src={product.thumbnail} 
                  className="card-img-top" 
                  alt={product.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">
                  <strong>Prix: </strong>
                  {product.price}€
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ); */
// };

export default ProductList;