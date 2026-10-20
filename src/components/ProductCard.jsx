import React from 'react';

export const ProductCard = ({ producto, onAddToCart }) => {
  const getBadgeColor = (estado) => {
    switch (estado) {
      case 'Matriculado': return 'bg-info text-dark';
      case 'En curso': return 'bg-primary';
      case 'Aprobado': return 'bg-success';
      case 'Certificado': return 'bg-warning text-dark';
      case 'Reprobado': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className="card h-100 shadow-sm border-0">
      <img 
        src={producto.imagen} 
        className="card-img-top" 
        alt={producto.nombre} 
        style={{ height: '180px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <span className="badge bg-secondary">{producto.area}</span>
          <span className={`badge ${getBadgeColor(producto.estado)}`}>
            {producto.estado}
          </span>
        </div>

        <h5 className="card-title fw-bold text-dark">{producto.nombre}</h5>
        <p className="text-muted small mb-1"><strong>Código:</strong> {producto.codigo}</p>
        <p className="text-muted small mb-1"><strong>Profesor:</strong> {producto.profesor}</p>
        <p className="text-muted small mb-2"><strong>Duración:</strong> {producto.duracion} horas | <strong>Capacidad:</strong> {producto.capacidadMax} alumnos</p>
        
        <div className="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
          <span className="fs-5 fw-bold text-success">
            ${producto.precio?.toLocaleString('es-CL')} CLP
          </span>
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => onAddToCart(producto)}
          >
            Matricular
          </button>
        </div>
      </div>
    </div>
  );
};