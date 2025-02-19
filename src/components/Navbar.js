import React, { useContext } from 'react';
import { Navbar, Nav, Container, Badge, Button, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { LanguageContext } from '../contexts/LanguageContext';

const NavbarComponent = () => {
  const { cartItems } = useContext(CartContext);
  const { isDarkTheme, setIsDarkTheme } = useContext(ThemeContext);
  const { language, setLanguage, translations } = useContext(LanguageContext);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Navbar bg={isDarkTheme ? 'secondary bg-gradient text-light' : 'primary bg-gradient text-light'} variant={isDarkTheme ? 'dark' : 'light'} expand="lg">
        
      <Container>
        <Navbar.Brand as={Link} to="/" className='text-light'>{translations[language].catalogue}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/" className='text-light'>{translations[language].home}</Nav.Link>
            <Nav.Link as={Link} to="/cart" className='text-light' >
              {translations[language].cart} <Badge bg="secondary">{cartCount}</Badge>
            </Nav.Link>

            {/* 🌐 Language Switcher */}
            <Dropdown className="mx-2">
              <Dropdown.Toggle variant={isDarkTheme ? 'secondary' : 'primary'}>
                🌐 {language.toUpperCase()}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setLanguage('en')}> English</Dropdown.Item>
                <Dropdown.Item onClick={() => setLanguage('fr')}> Français</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {/* 🎨 Theme Toggle */}
            <Button
              variant={isDarkTheme ? 'secondry bg-gradient text-light' : 'primary bg-gradient text-light'}
              onClick={() => setIsDarkTheme(!isDarkTheme)}
            >
              {isDarkTheme ? translations[language].lightMode : translations[language].darkMode}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
