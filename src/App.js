import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { CartProvider } from './contexts/CartContext';
import AppContent from './components/AppContent';
import NavbarComponent from './components/Navbar';
import CartPage from './components/CartPage';

const App = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <CartProvider>
          <Router>
            <NavbarComponent />
            <Routes>
              <Route path="/" element={<AppContent />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </Router>
        </CartProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
