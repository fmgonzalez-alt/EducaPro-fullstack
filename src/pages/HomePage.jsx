import React from 'react';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  // Paleta de la imagen 2 (Hortensias / In Color Balance):
  // Borgoña (#5a2a43), Rosa Viejo (#c4738f), Rosa Claro (#e4b9c9), Lavanda (#9b83b3), Ciruela (#6e4775)
  const areas = [
    { 
      nombre: 'Tecnología', 
      imagen: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=400&auto=format&fit=crop',
      colorBadge: '#5a2a43'
    },
    { 
      nombre: 'Diseño', 
      imagen: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=400&auto=format&fit=crop',
      colorBadge: '#c4738f'
    },
    { 
      nombre: 'Marketing', 
      imagen: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop',
      colorBadge: '#6e4775'
    },
    { 
      nombre: 'Oficios Técnicos', 
      imagen: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=400&auto=format&fit=crop',
      colorBadge: '#9b83b3'
    }
  ];

  return (
    <div 
      style={{ 
        background: 'linear-gradient(135deg, #2a1824 0%, #3d2233 50%, #1f1420 100%)', 
        minHeight: 'calc(100vh - 60px)', 
        paddingTop: '2.5rem', 
        paddingBottom: '3.5rem' 
      }}
    >
      <div className="container">
        {/* Banner Principal con Tono Borgoña/Rosa Elegante */}
        <div 
          className="card border-0 text-white shadow-lg mb-5 overflow-hidden" 
          style={{ 
            background: 'linear-gradient(135deg, rgba(90, 42, 67, 0.88), rgba(110, 71, 117, 0.92)), url("https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '16px',
            padding: '65px 25px',
            border: '1px solid #7c4463'
          }}
        >
          <div className="card-body text-center">
            <span 
              className="badge mb-3 px-3 py-2 fw-bold text-uppercase shadow-sm"
              style={{ backgroundColor: '#c4738f', color: '#ffffff', letterSpacing: '1px' }}
            >
              Excelencia Académica
            </span>
            <h1 className="fw-bold display-4 mb-3 text-white">EducaPro - Instituto de Formación</h1>
            <p className="lead max-w-2xl mx-auto" style={{ color: '#f3dbe3' }}>
              Formación técnica y profesional de alto nivel. Transforma tu futuro laboral inscirbiéndote en nuestras especialidades.
            </p>
          </div>
        </div>

        {/* Áreas de Especialización */}
        <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom" style={{ borderColor: '#6e4775' }}>
          <h3 className="fw-bold m-0" style={{ color: '#f3dbe3' }}>Áreas de Especialización</h3>
          <span className="small fw-semibold" style={{ color: '#e4b9c9' }}>Explora nuestros programas</span>
        </div>

        <div className="row g-4">
          {areas.map((area, idx) => (
            <div key={idx} className="col-12 col-sm-6 col-md-3">
              <Link to={`/categorias?area=${area.nombre}`} className="text-decoration-none">
                <div 
                  className="card border-0 text-white shadow-lg overflow-hidden h-100"
                  style={{
                    height: '160px',
                    borderRadius: '14px',
                    backgroundImage: `linear-gradient(rgba(42, 24, 36, 0.5), rgba(90, 42, 67, 0.85)), url("${area.imagen}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    border: `1px solid ${area.colorBadge}`,
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }}
                >
                  <div className="card-body d-flex flex-column align-items-center justify-content-center p-3 text-center">
                    <span 
                      className="badge mb-2 px-2 py-1 extra-small fw-bold"
                      style={{ backgroundColor: area.colorBadge, color: '#ffffff' }}
                    >
                      Especialidad
                    </span>
                    <h4 className="fw-bold text-white m-0">{area.nombre}</h4>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};