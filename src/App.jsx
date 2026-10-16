import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { CheckoutPage } from './pages/CheckoutPage';
import { PagoExitoso } from './pages/PagoExitoso';
import { AdminDashboard } from './pages/AdminDashboard';

export default function App() {
  const [carrito, setCarrito] = useState([]);

  const handleAddToCart = (producto) => {
    const existe = carrito.find(item => item.id === producto.id);
    if (existe) {
      setCarrito(carrito.map(item => item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item));
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const handleClearCart = () => setCarrito([]);

  const cartTotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  return (
    <div className="bg-light min-vh-100">
      <Navbar cartTotal={cartTotal} />
      <Routes>
        <Route path="/" element={<HomePage onAddToCart={handleAddToCart} />} />
        <Route path="/carrito" element={<CheckoutPage carrito={carrito} onClearCart={handleClearCart} />} />
        <Route path="/pago-exitoso" element={<PagoExitoso />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}