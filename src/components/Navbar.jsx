import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = ({ cartCount }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        {/* Botón Hamburguesa para pantallas móviles */}
        <button 
          className="navbar-toggler me-2" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <Link className="navbar-brand fw-bold text-primary fs-3 me-auto me-lg-4" to="/">
          Educa<span className="text-white">Pro</span>
        </Link>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/categorias">Áreas de Estudio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin">Gestión Académica</Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2 flex-wrap mt-2 mt-lg-0">
            <button className="btn btn-outline-light btn-sm" onClick={() => alert('Módulo de Login')}>
              Iniciar Sesión
            </button>
            <button className="btn btn-primary btn-sm" onClick={() => alert('Módulo de Registro')}>
              Crear Cuenta
            </button>
            <Link to="/checkout" className="btn btn-success btn-sm position-relative fw-bold ms-lg-2">
              💳 Pago Institucional
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};