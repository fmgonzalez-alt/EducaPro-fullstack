import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = ({ cartCount }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary fs-3" to="/">
          Educa<span className="text-white">Pro</span>
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Catálogo de Cursos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin">Panel de Gestión</Link>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            <Link to="/checkout" className="btn btn-outline-light position-relative">
              Matrículas / Carrito
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