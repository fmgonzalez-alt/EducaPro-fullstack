import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = ({ cartTotal = 0 }) => {
  return (
    <header className="bg-white border-bottom shadow-sm">
      <div className="container py-2 d-flex justify-content-between align-items-center">
        <div className="bg-secondary text-white d-flex align-items-center justify-content-center rounded" style={{ width: '40px', height: '40px' }}>
          <small className="fw-bold">40x40</small>
        </div>

        <div className="d-flex align-items-center gap-2" style={{ maxWidth: '400px', width: '100%' }}>
          <input type="text" className="form-control" placeholder="Buscar productos escolares..." />
          <button className="btn btn-outline-success">Buscar</button>
        </div>

        <div className="d-flex gap-2">
          <Link to="/login" className="btn btn-outline-primary btn-sm">Iniciar Sesión</Link>
          <Link to="/registro" className="btn btn-primary btn-sm">Crear Cuenta</Link>
        </div>
      </div>

      <nav className="container d-flex justify-content-between align-items-center py-2">
        <div className="d-flex gap-4 fw-semibold text-secondary align-items-center">
          <Link to="/" className="text-decoration-none text-dark fw-bold">Home</Link>
          
          <div className="dropdown">
            <span className="dropdown-toggle text-dark" role="button" data-bs-toggle="dropdown" style={{ cursor: 'pointer' }}>
              Categorías
            </span>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" to="/categorias">Todas las Categorías</Link></li>
              <li><Link className="dropdown-item" to="/categorias/libreria">Librería y Cuadernos</Link></li>
              <li><Link className="dropdown-item" to="/categorias/mochilas">Mochilas y Estuches</Link></li>
              <li><Link className="dropdown-item" to="/categorias/tecnologia">Tecnología Estudiantil</Link></li>
            </ul>
          </div>

          <Link to="/ofertas" className="text-decoration-none text-secondary">Ofertas</Link>
          <Link to="/nosotros" className="text-decoration-none text-secondary">Nosotros</Link>
          <Link to="/blog" className="text-decoration-none text-secondary">Blog</Link>
          <Link to="/contacto" className="text-decoration-none text-secondary">Contacto</Link>
          <Link to="/admin" className="text-decoration-none text-danger fw-bold"><i className="bi bi-gear-fill me-1"></i>Admin</Link>
        </div>

        <Link to="/carrito" className="btn btn-success fw-bold d-flex align-items-center gap-2">
          <i className="bi bi-cart-fill"></i> Carrito ${cartTotal.toLocaleString()}
        </Link>
      </nav>
    </header>
  );
};