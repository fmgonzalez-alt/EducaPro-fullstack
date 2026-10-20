import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Navbar = ({ cartCount, isLoggedIn, user, onOpenLogin, onLogout }) => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  const toggleSidebar = () => setIsOpenSidebar(!isOpenSidebar);
  const closeSidebar = () => setIsOpenSidebar(false);

  return (
    <>
      <nav className="navbar navbar-dark bg-dark shadow-sm py-2">
        <div className="container d-flex align-items-center justify-content-between">
          
          <div className="d-flex align-items-center gap-3">
            <button 
              className="btn btn-outline-light border-0 p-1" 
              type="button" 
              onClick={toggleSidebar}
              style={{ fontSize: '1.6rem', cursor: 'pointer', lineHeight: 1 }}
              aria-label="Abrir menú"
            >
              ☰
            </button>

            <Link className="navbar-brand fw-bold text-primary fs-3 m-0" to="/" onClick={closeSidebar}>
              Educa<span className="text-white">Pro</span>
            </Link>
          </div>

          <div className="d-flex align-items-center gap-2">
            <Link to="/checkout" className="btn btn-success btn-sm position-relative fw-bold px-3 py-2">
              💳 PAGO INSTITUCIONAL
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

        </div>
      </nav>

      {isOpenSidebar && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100" 
          style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1040 }}
          onClick={closeSidebar}
        />
      )}

      <div 
        className="position-fixed top-0 start-0 h-100 bg-dark text-white shadow-lg d-flex flex-column"
        style={{ 
          width: '310px', 
          maxWidth: '80vw',
          zIndex: 1050, 
          transform: isOpenSidebar ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.35s ease-in-out',
          backgroundColor: '#161b22',
          borderRight: '1px solid #30363d'
        }}
      >
        <div className="p-4 border-bottom border-secondary d-flex justify-content-between align-items-center">
          <h5 className="fw-bold m-0 text-white">MENÚ</h5>
          <button 
            type="button" 
            className="btn-close btn-close-white" 
            onClick={closeSidebar}
            aria-label="Cerrar"
          />
        </div>

        <div className="p-4 flex-grow-1 overflow-auto">
          <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
            <li>
              <Link className="text-white text-decoration-none fw-bold fs-6 d-block py-1" to="/" onClick={closeSidebar}>
                HOME
              </Link>
            </li>

            <li className="dropdown">
              <a 
                className="text-white text-decoration-none fw-bold fs-6 dropdown-toggle d-block py-1" 
                href="#" 
                role="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                CATEGORÍAS
              </a>
              <ul className="dropdown-menu shadow border-0 mt-1" style={{ backgroundColor: '#21262d' }}>
                <li><Link className="dropdown-item text-white" to="/categorias?area=Tecnología" onClick={closeSidebar}>Tecnología</Link></li>
                <li><Link className="dropdown-item text-white" to="/categorias?area=Diseño" onClick={closeSidebar}>Diseño</Link></li>
                <li><Link className="dropdown-item text-white" to="/categorias?area=Marketing" onClick={closeSidebar}>Marketing</Link></li>
                <li><Link className="dropdown-item text-white" to="/categorias?area=Oficios Técnicos" onClick={closeSidebar}>Oficios Técnicos</Link></li>
                <li><Link className="dropdown-item text-white" to="/categorias?area=Administración" onClick={closeSidebar}>Administración</Link></li>
              </ul>
            </li>

            <li>
              <Link className="text-white text-decoration-none fw-bold fs-6 d-block py-1" to="/informacion-academica" onClick={closeSidebar}>
                INFORMACIÓN ACADÉMICA
              </Link>
            </li>

            <li>
              <Link className="text-white text-decoration-none fw-bold fs-6 d-block py-1" to="/contacto" onClick={closeSidebar}>
                CONTACTO
              </Link>
            </li>

            <li>
              <Link className="text-white text-decoration-none fw-bold fs-6 d-block py-1" to="/ajustes" onClick={closeSidebar}>
                AJUSTES
              </Link>
            </li>
          </ul>
        </div>

        <div className="p-4 border-top border-secondary bg-black bg-opacity-25">
          {!isLoggedIn ? (
            <button className="btn btn-primary fw-bold w-100" onClick={() => { onOpenLogin(); closeSidebar(); }}>
              Iniciar Sesión / Crear Cuenta
            </button>
          ) : (
            <div>
              <div className="d-flex align-items-center gap-2 mb-3">
                <span className="fs-4">👤</span>
                <div>
                  <small className="text-muted d-block extra-small">Usuario Activo</small>
                  <strong className="text-info fw-bold text-truncate d-block" style={{ maxWidth: '200px' }}>
                    {user?.nombre}
                  </strong>
                </div>
              </div>
              <button 
                className="btn btn-danger btn-sm fw-bold w-100" 
                onClick={() => { onLogout(); closeSidebar(); }}
              >
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>

      </div>
    </>
  );
};