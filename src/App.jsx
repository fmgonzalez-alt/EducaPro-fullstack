import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { CategoriasPage } from './pages/CategoriasPage';
import { InformacionAcademica } from './pages/InformacionAcademica';
import { ContactoPage } from './pages/ContactoPage';
import { AjustesPage } from './pages/AjustesPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { CheckoutPage } from './pages/CheckoutPage';
import { PagoExitoso } from './pages/PagoExitoso';
import { LoginModal } from './components/LoginModal';

export const App = () => {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

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
    <>
      <Navbar 
        cartCount={cart.length} 
        isLoggedIn={isLoggedIn} 
        user={user}
        onOpenLogin={() => setIsModalOpen(true)} 
        onLogout={handleLogout} 
      />

      <Routes>
        <Route path="/" element={<HomePage onAddToCart={handleAddToCart} isLoggedIn={isLoggedIn} />} />
        <Route 
          path="/categorias" 
          element={
            <CategoriasPage 
              onAddToCart={handleAddToCart} 
              isLoggedIn={isLoggedIn} 
              onOpenLogin={() => setIsModalOpen(true)} 
            />
          } 
        />
        <Route path="/informacion-academica" element={<InformacionAcademica />} />
        <Route path="/contacto" element={<ContactoPage />} />
        <Route 
          path="/ajustes" 
          element={
            <AjustesPage 
              user={user} 
              isLoggedIn={isLoggedIn} 
              onOpenLogin={() => setIsModalOpen(true)}
              onUpdateUser={(updatedUser) => setUser(updatedUser)} 
            />
          } 
        />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route 
          path="/checkout" 
          element={
            <CheckoutPage 
              cart={cart} 
              user={user}
              onRemove={handleRemoveFromCart} 
              onClear={handleClearCart} 
            />
          } 
        />
        <Route path="/pago-exitoso" element={<PagoExitoso />} />
      </Routes>

      <LoginModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onLoginSuccess={handleLoginSuccess} 
      />
    </>
  );
};

export default App;