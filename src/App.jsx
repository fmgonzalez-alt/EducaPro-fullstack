import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { AdminDashboard } from './pages/AdminDashboard';
import { CheckoutPage } from './pages/CheckoutPage';
import { PagoExitoso } from './pages/PagoExitoso';

export const App = () => {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (curso) => {
    if (!cart.some(item => item.id === curso.id)) {
      setCart([...cart, curso]);
    }
  };

  const handleRemoveFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <Router>
      <Navbar cartCount={cart.length} />
      <Routes>
        <Route path="/" element={<HomePage onAddToCart={handleAddToCart} />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route 
          path="/checkout" 
          element={
            <CheckoutPage 
              cart={cart} 
              onRemove={handleRemoveFromCart} 
              onClear={handleClearCart} 
            />
          } 
        />
        <Route path="/pago-exitoso" element={<PagoExitoso />} />
      </Routes>
    </Router>
  );
};

export default App;