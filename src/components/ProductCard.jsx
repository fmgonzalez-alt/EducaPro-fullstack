import React from 'react';

export const ProductCard = ({ producto, onAddToCart }) => {
  return (
    <div className="card h-100 border-0 shadow-sm text-center overflow-hidden">
      <div style={{ height: '220px', overflow: 'hidden', backgroundColor: '#f8f9fa' }}>
        <img 
          src={producto.imagen} 
          alt={producto.nombre} 
          className="w-100 h-100" 
          style={{ objectFit: 'cover' }}
        />
      </div>
      
      <div className="card-body d-flex flex-column align-items-center">
        <h5 className="card-title fw-bold text-dark mb-1 fs-6">{producto.nombre}</h5>
        <p className="text-muted small mb-1">{producto.categoria}</p>
        
        <p className="fs-5 fw-bold text-success mb-1">
          $ {producto.precio.toLocaleString()}
        </p>

        <p className="small text-secondary mb-2">
          Stock Disponible: <span className={producto.stock <= 3 ? 'text-danger fw-bold' : ''}>{producto.stock}</span>
        </p>

        <button 
          className="btn btn-dark w-100 mt-auto fw-bold" 
          onClick={() => onAddToCart(producto)}
        >
          Añadir
        </button>
      </div>
    </div>
  );
};