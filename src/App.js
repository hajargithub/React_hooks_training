import React, { createContext, useState } from 'react';
import ProductList from './components/ProductList';
import ProductSearch from './components/ProductSearch';
import ThemeToggle from './components/ThemeToggle';
import 'bootstrap/dist/css/bootstrap.min.css';

export const ThemeContext = createContext();

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
      <div className={`${isDarkTheme ? 'bg-dark text-light' : 'bg-light'}`} style={{ minHeight: "100vh" }}>
        <header className={`py-3 shadow ${isDarkTheme ? 'bg-secondary bg-gradient text-light' : 'bg-primary  text-light'}`}>
          <div className="container">
            <h1 className="text-center">Catalogue de Produits</h1>
            <div className="d-flex justify-content-end gap-2">
              <ThemeToggle />
            </div>
          </div>
        </header>
        <main className="container py-4">
          <ProductSearch onSearch={setSearchTerm} />
          <ProductList searchTerm={searchTerm} />
        </main>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
