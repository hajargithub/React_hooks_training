import React, { useContext } from 'react';
import { Table, Button, Form, Card } from 'react-bootstrap';
import { CartContext } from '../contexts/CartContext';
import { LanguageContext } from '../contexts/LanguageContext';
import { ThemeContext } from '../contexts/ThemeContext';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const { language, translations } = useContext(LanguageContext);
  const { isDarkTheme } = useContext(ThemeContext);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className={`container w-100 py-5 ${isDarkTheme ? 'bg-secondry text-light' : 'bg-light text-dark'}`} style={{ minHeight: '100vh' }}>
      <Card className={`p-4 shadow-lg ${isDarkTheme ? 'bg-secondary  bg-gradient text-light' : 'bg-white'}`}>
        <h2 className="mb-4">{translations[language].yourCart}</h2>

        {cartItems.length === 0 ? (
          <p className="text-center">{translations[language].emptyCart}</p>
        ) : (
          <>
            <Table bordered hover responsive className={isDarkTheme ? ' table-dark  table-gradient '  : 'table-light'}>
              <thead>
                <tr>
                  <th>{translations[language].catalogue}</th>
                  <th>{translations[language].price} (€)</th>
                  <th>{translations[language].quantity}</th>
                  <th>Subtotal (€)</th>
                  <th>{translations[language].remove}</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                    <td>
                      <Form.Control
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        className={`text-center ${isDarkTheme ? 'bg-dark text-light border-light' : 'bg-light'}`}
                        style={{ width: '80px', margin: '0 auto' }}
                      />
                    </td>
                    <td>{(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <Button variant="danger" size="sm" onClick={() => removeFromCart(item.id)}>
                        {translations[language].remove}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div className="d-flex justify-content-between align-items-center mt-4">
              <h4>{translations[language].total}: €{totalPrice.toFixed(2)}</h4>
              <Button variant="warning" onClick={clearCart}>
                {translations[language].clearCart}
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default CartPage;
