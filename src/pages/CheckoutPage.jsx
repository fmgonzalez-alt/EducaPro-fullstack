import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CheckoutPage = ({ carrito, onClearCart }) => {
  const navigate = useNavigate();
  const [cliente, setCliente] = useState({ nombre: '', correo: '', calle: '' });

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const handlePagar = (e) => {
    e.preventDefault();
    if (!cliente.nombre || !cliente.correo) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }
    const orden = { id: '#20240705', total, cliente };
    onClearCart();
    navigate('/pago-exitoso', { state: { orden } });
  };

  return (
    <div className="container my-4">
      <h2>MI TIENDA ONLINE ESTUDIANTE - Checkout</h2>
      <div className="row g-4 mt-2">
        <div className="col-md-7">
          <form onSubmit={handlePagar} className="card p-4 shadow-sm">
            <h4 className="mb-3">Información del Cliente</h4>
            <div className="mb-3">
              <label className="form-label">Nombre Completo *</label>
              <input type="text" className="form-control" value={cliente.nombre} onChange={e => setCliente({...cliente, nombre: e.target.value})} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Correo Electrónico *</label>
              <input type="email" className="form-control" value={cliente.correo} onChange={e => setCliente({...cliente, correo: e.target.value})} required />
            </div>
            <button type="submit" className="btn btn-success btn-lg w-100 mt-3">
              Pagar ahora ${total.toLocaleString()}
            </button>
          </form>
        </div>
        <div className="col-md-5">
          <div className="card p-4 shadow-sm bg-light">
            <h4>Resumen de Compra</h4>
            <ul className="list-group mb-3">
              {carrito.map(item => (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h6>{item.nombre}</h6>
                    <small className="text-muted">Cantidad: {item.cantidad}</small>
                  </div>
                  <span>${(item.precio * item.cantidad).toLocaleString()}</span>
                </li>
              ))}
            </ul>
            <h5 className="fw-bold">Total Pagado: ${total.toLocaleString()}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};