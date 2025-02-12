import React from 'react';
import { Spinner } from 'react-bootstrap';

const SpinnerComponent = () => {
  return (
    <div className="text-center my-4">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Chargement...</span>
      </Spinner>
    </div>
  );
};

export default SpinnerComponent;
