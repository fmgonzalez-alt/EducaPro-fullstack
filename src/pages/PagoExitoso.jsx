import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export const PagoExitoso = () => {
  const location = useLocation();
  const orden = location.state?.orden || { id: '#20240705', total: 0 };

  return (
    <div className="container text-center my-5">
      <div className="card p-5 shadow-sm border-success mx-auto" style={{ maxWidth: '600px' }}>
        <i className="bi bi-check-circle-fill text-success display-1 mb-3"></i>
        <h2 className="text-success">Se ha realizado la compra</h2>
        <p className="fs-5">Código de Orden: <strong>{orden.id}</strong></p>
        <p>Gracias por comprar en <strong>MI TIENDA ONLINE ESTUDIANTE</strong>.</p>
        <Link to="/" className="btn btn-primary mt-3">Volver a la Tienda</Link>
      </div>
    </div>
  );
};