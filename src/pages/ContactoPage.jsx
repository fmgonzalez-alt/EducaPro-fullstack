import React from 'react';

export const ContactoPage = () => {
  return (
    <div 
      style={{ 
        backgroundColor: '#181414', 
        color: '#d7cdbb',
        minHeight: 'calc(100vh - 60px)', 
        paddingTop: '4rem', 
        paddingBottom: '4rem' 
      }}
    >
      <div className="container" style={{ maxWidth: '950px' }}>
        <div 
          className="p-4 p-md-5 rounded-4 shadow-lg"
          style={{ backgroundColor: '#443434', border: '1px solid #c4827e' }}
        >
          <span 
            className="badge mb-3 px-3 py-2 fw-bold text-uppercase shadow-sm"
            style={{ backgroundColor: '#c4827e', color: '#ffffff' }}
          >
            Información de Contacto
          </span>
          <h1 className="fw-bold text-white mb-2">Canales Oficiales EducaPro</h1>
          <p className="lead mb-4" style={{ color: '#e3c0be' }}>
            A continuación se presentan los medios oficiales de comunicación institucionales para atención a estudiantes, docentes y convenios.
          </p>

          <div className="row g-4 text-light">
            <div className="col-12 col-md-4">
              <div className="p-4 rounded-3 h-100" style={{ backgroundColor: '#2b2222', border: '1px solid #c4827e' }}>
                <div className="fs-2 mb-2">✉️</div>
                <h5 className="fw-bold text-white mb-2">Correo Electrónico</h5>
                <p className="small mb-1 text-warning font-monospace">contacto@educapro.cl</p>
                <p className="small mb-0 text-warning font-monospace">admision@educapro.cl</p>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="p-4 rounded-3 h-100" style={{ backgroundColor: '#2b2222', border: '1px solid #c4827e' }}>
                <div className="fs-2 mb-2">💼</div>
                <h5 className="fw-bold text-white mb-2">LinkedIn Oficial</h5>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="small text-warning text-decoration-none fw-semibold d-block mb-1"
                >
                  linkedin.com/company/educapro-cl
                </a>
                <small className="text-muted">Red profesional e inserción laboral</small>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="p-4 rounded-3 h-100" style={{ backgroundColor: '#2b2222', border: '1px solid #c4827e' }}>
                <div className="fs-2 mb-2">📍</div>
                <h5 className="fw-bold text-white mb-2">Mesa Central y Sedes</h5>
                <p className="small mb-1 text-light">Santiago | Valparaíso | Concepción</p>
                <p className="small mb-0 text-warning fw-bold">Mesa Central: +56 2 2900 0000</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};