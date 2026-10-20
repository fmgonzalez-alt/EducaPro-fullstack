import React, { useState, useEffect } from 'react';
import { getProductos } from '../data/db';
import { ProductCard } from '../components/ProductCard';

export const HomePage = ({ onAddToCart }) => {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    setCursos(getProductos());
  }, []);

  const areas = [
    { nombre: 'Tecnología', imagen: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=400&auto=format&fit=crop' },
    { nombre: 'Diseño', imagen: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=400&auto=format&fit=crop' },
    { nombre: 'Marketing', imagen: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop' },
    { nombre: 'Oficios Técnicos', imagen: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=400&auto=format&fit=crop' }
  ];

  return (
    <div className="container my-4">
      <div 
        className="rounded text-white p-5 mb-5 text-center shadow position-relative overflow-hidden"
        style={{ 
          backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.75)), url("https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <h1 className="fw-bold display-4">EducaPro - Instituto de Formación</h1>
        <p className="lead mx-auto" style={{ maxWidth: '700px' }}>
          Formación técnica y profesional en Santiago, Valparaíso y Concepción. Optimiza tu progreso académico e inscríbete en nuestros programas.
        </p>
      </div>

      <h3 className="fw-bold mb-3 text-secondary">Áreas de Especialización</h3>
      <div className="row g-3 mb-5">
        {areas.map((area, idx) => (
          <div key={idx} className="col-6 col-md-3">
            <div className="card border-0 shadow-sm text-white overflow-hidden" style={{ height: '120px' }}>
              <img src={area.imagen} className="card-img w-100 h-100" style={{ objectFit: 'cover', filter: 'brightness(0.6)' }} alt={area.nombre} />
              <div className="card-img-overlay d-flex align-items-center justify-content-center">
                <h5 className="fw-bold text-center m-0">{area.nombre}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h3 className="fw-bold mb-4 text-secondary">Catálogo de Cursos Disponibles</h3>
      <div className="row g-4">
        {cursos.map((curso) => (
          <div key={curso.id} className="col-12 col-md-6 col-lg-4">
            <ProductCard producto={curso} onAddToCart={onAddToCart} />
          </div>
        ))}
      </div>
    </div>
  );
};