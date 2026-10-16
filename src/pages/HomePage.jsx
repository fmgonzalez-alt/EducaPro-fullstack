import React, { useState, useEffect } from 'react';
import { getProductos } from '../data/db';
import { ProductCard } from '../components/ProductCard';

export const HomePage = ({ onAddToCart }) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    setProductos(getProductos());
  }, []);

  const categorias = [
    {
      nombre: 'Librería y Cuadernos',
      imagen: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop'
    },
    {
      nombre: 'Mochilas y Estuches',
      imagen: 'https://media.adeo.com/mkp/ee850f0c6a6a3f91ed2c6e1ac1687eb5/media.jpg?width=3000&height=3000&format=jpg&quality=80&fit=bounds'
    },
    {
      nombre: 'Tecnología Estudiantil',
      imagen: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop'
    }
  ];

  return (
    <div className="container my-4">
      {/* Banner Principal */}
      <div 
        className="rounded text-white d-flex flex-column align-items-center justify-content-center mb-5 text-center shadow-sm position-relative overflow-hidden"
        style={{ 
          width: '100%', 
          height: '300px',
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url("https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1200&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <h1 className="fw-bold display-5">Nuevos Útiles y Accesorios</h1>
        <p className="lead text-white-50">Descubre los mejores artículos de estudio con descuentos exclusivos.</p>
        <div className="d-flex gap-2 mt-2">
          <span className="badge bg-light rounded-circle" style={{ width: '10px', height: '10px' }}></span>
          <span className="badge bg-white rounded-circle" style={{ width: '10px', height: '10px' }}></span>
          <span className="badge bg-light rounded-circle" style={{ width: '10px', height: '10px' }}></span>
        </div>
      </div>

      {/* Categorías */}
      <h2 className="text-center fw-bold mb-4">Categorías</h2>
      <div className="row g-4 mb-5">
        {categorias.map((cat, idx) => (
          <div key={idx} className="col-12 col-md-4">
            <div 
              className="rounded shadow-sm overflow-hidden border-0"
              style={{ width: '100%', height: '200px' }}
            >
              <img 
                src={cat.imagen} 
                alt={cat.nombre} 
                className="w-100 h-100" 
                style={{ objectFit: 'cover' }}
              />
            </div>
            <h5 className="text-center mt-2 fw-semibold text-dark">{cat.nombre}</h5>
          </div>
        ))}
      </div>

      {/* Lista de Productos */}
      <h2 className="text-center fw-bold mb-4">Lista de Productos</h2>
      <div className="row g-4">
        {productos.map((prod) => (
          <div key={prod.id} className="col-12 col-md-6 col-lg-3">
            <ProductCard producto={prod} onAddToCart={onAddToCart} />
          </div>
        ))}
      </div>
    </div>
  );
};