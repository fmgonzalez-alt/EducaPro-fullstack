import React from 'react';

export const InformacionAcademica = () => {
  const equipoInstitucional = [
    {
      cargo: 'Director Académico',
      cantidad: '1 Director',
      titular: 'Dr. Roberto Morales V.',
      rol: 'Supervisión de Calidad y Decisiones Estratégicas',
      funciones: 'Supervisa la calidad académica integral y toma decisiones estratégicas curriculares.',
      gestionActual: 'Recibe reportes de forma manual, consolidando la información académica general en planillas Excel.',
      colorBadge: '#c4827e'
    },
    {
      cargo: 'Administrador General',
      cantidad: '1 Administrador',
      titular: 'Dra. Patricia Silva A.',
      rol: 'Gestión Financiera y Presupuestaria',
      funciones: 'Gestiona las finanzas, presupuestos institucionales y decisiones estratégicas de recursos.',
      gestionActual: 'Recibe reportes de gestión académica de forma manual, consolidando la información financiera en Excel.',
      colorBadge: '#d4b47c'
    },
    {
      cargo: 'Coordinadores Académicos',
      cantidad: '5 Coordinadores',
      titular: 'Equipo de Coordinación Docente',
      rol: 'Programación y Asignación Docente',
      funciones: 'Coordina la programación de cursos, asignación de profesores y seguimiento académico.',
      gestionActual: 'Utiliza planillas Excel para gestionar la programación de clases y el seguimiento de estudiantes.',
      colorBadge: '#e3c0be'
    },
    {
      cargo: 'Administrativos',
      cantidad: '3 Administrativos',
      titular: 'Equipo de Admisión y Registro',
      rol: 'Matrícula, Certificación y Atención',
      funciones: 'Gestiona la matrícula de estudiantes, certificación oficial y atención continua.',
      gestionActual: 'Mantiene registros manuales en Excel para el control de matriculados y certificaciones.',
      colorBadge: '#443434'
    }
  ];

  return (
    <div 
      style={{ 
        backgroundColor: '#181414', 
        color: '#d7cdbb',
        minHeight: 'calc(100vh - 60px)', 
        paddingTop: '3rem', 
        paddingBottom: '4rem' 
      }}
    >
      <div className="container">

        {/* PRESENTACIÓN DE LA EMPRESA */}
        <div 
          className="p-4 p-md-5 rounded-4 shadow-lg mb-5"
          style={{ 
            backgroundColor: '#443434', 
            border: '1px solid #c4827e' 
          }}
        >
          <span 
            className="badge mb-3 px-3 py-2 fw-bold text-uppercase shadow-sm"
            style={{ backgroundColor: '#c4827e', color: '#ffffff', letterSpacing: '1px' }}
          >
            Presentación Institucional
          </span>
          <h1 className="fw-bold text-white display-5 mb-3">
            EducaPro — Instituto de Formación Técnica y Profesional
          </h1>

          <p className="lead" style={{ color: '#d7cdbb', fontSize: '1.2rem', lineHeight: '1.7' }}>
            Fundado en <strong>2010</strong>, <strong>EducaPro</strong> es un instituto de formación técnica y profesional con presencia consolidada a través de sus sedes estratégicas en <strong>Santiago, Valparaíso y Concepción</strong>.
          </p>

          <p style={{ color: '#e3c0be', fontSize: '1.05rem', lineHeight: '1.7' }}>
            El instituto ofrece programas de capacitación de excelencia en áreas clave como <strong>Tecnología, Administración, Diseño y Oficios Técnicos</strong>, orientados a potenciar la empleabilidad y el desarrollo profesional continuo en el país.
          </p>

          {/* MÉTRICAS CLAVE */}
          <div className="row g-3 mt-4">
            <div className="col-12 col-md-3">
              <div className="p-3 rounded-3 text-center" style={{ backgroundColor: 'rgba(0,0,0,0.25)', border: '1px solid #c4827e' }}>
                <h2 className="fw-bold m-0" style={{ color: '#d4b47c' }}>80</h2>
                <small className="text-white">Cursos impartidos al año</small>
              </div>
            </div>

            <div className="col-12 col-md-3">
              <div className="p-3 rounded-3 text-center" style={{ backgroundColor: 'rgba(0,0,0,0.25)', border: '1px solid #c4827e' }}>
                <h2 className="fw-bold m-0" style={{ color: '#d4b47c' }}>3.200</h2>
                <small className="text-white">Estudiantes matriculados</small>
              </div>
            </div>

            <div className="col-12 col-md-3">
              <div className="p-3 rounded-3 text-center" style={{ backgroundColor: 'rgba(0,0,0,0.25)', border: '1px solid #c4827e' }}>
                <h2 className="fw-bold m-0" style={{ color: '#d4b47c' }}>25</h2>
                <small className="text-white">Profesores en el cuerpo docente</small>
              </div>
            </div>

            <div className="col-12 col-md-3">
              <div className="p-3 rounded-3 text-center" style={{ backgroundColor: 'rgba(0,0,0,0.25)', border: '1px solid #c4827e' }}>
                <h2 className="fw-bold m-0" style={{ color: '#d4b47c' }}>3 Sedes</h2>
                <small className="text-white">Santiago, Valparaíso, Concepción</small>
              </div>
            </div>
          </div>
        </div>

        {/* DIAGNÓSTICO OPERATIVO */}
        <div 
          className="p-4 p-md-5 rounded-4 shadow-lg mb-5"
          style={{ 
            backgroundColor: '#2b2222', 
            border: '1px solid #c4827e' 
          }}
        >
          <div className="d-flex align-items-center gap-2 mb-3">
            <span className="badge px-3 py-2 fw-bold text-uppercase" style={{ backgroundColor: '#c4827e', color: '#fff' }}>
              Diagnóstico Operativo
            </span>
            <span className="badge px-3 py-2 fw-bold text-uppercase" style={{ backgroundColor: '#d4b47c', color: '#443434' }}>
              Crecimiento del +45% en Demanda
            </span>
          </div>

          <h3 className="fw-bold text-white mb-3">Desafío Institucional y Transformación Digital</h3>

          <p style={{ color: '#d7cdbb', fontSize: '1.05rem', lineHeight: '1.7' }}>
            En los últimos tres años, la demanda de cursos en EducaPro ha experimentado un incremento del <strong>45%</strong>, lo que ha generado una alta tensión operativa sobre el esquema tradicional de gestión académica.
          </p>

          <p style={{ color: '#e3c0be', fontSize: '1rem', lineHeight: '1.7' }}>
            Actualmente, la institución depende de sistemas manuales basados en <strong>planillas Excel, correos electrónicos y herramientas básicas</strong> para controlar la matrícula, asignación docente, calificaciones, asistencia y emisión de certificados.
          </p>

          <div className="p-3 rounded-3 mt-3" style={{ backgroundColor: 'rgba(196, 130, 126, 0.15)', borderLeft: '4px solid #c4827e' }}>
            <strong className="text-white d-block mb-1">🎯 Objetivo de la Implementación del Portal Digital EducaPro:</strong>
            <span style={{ color: '#d7cdbb', fontSize: '0.95rem' }}>
              Modernizar y automatizar la gestión integral de cursos, garantizando la trazabilidad de datos, eliminando la duplicación y elevando la calidad del servicio educativo para la comunidad académica.
            </span>
          </div>
        </div>

        {/* ESTRUCTURA ORGANIZACIONAL */}
        <div>
          <div className="mb-4 pb-2 border-bottom" style={{ borderColor: '#c4827e' }}>
            <span 
              className="badge mb-2 px-3 py-2 fw-bold text-uppercase shadow-sm"
              style={{ backgroundColor: '#d4b47c', color: '#443434' }}
            >
              Estructura Organizacional
            </span>
            <h2 className="fw-bold text-white mb-1">Roles de Gestión y Administración</h2>
            <p className="m-0" style={{ color: '#e3c0be' }}>
              Distribución del equipo responsable de la conducción y calidad académica de EducaPro.
            </p>
          </div>

          <div className="row g-4">
            {equipoInstitucional.map((miembro, index) => (
              <div key={index} className="col-12 col-md-6">
                <div 
                  className="card shadow-lg border-0 h-100 overflow-hidden"
                  style={{ 
                    backgroundColor: '#443434', 
                    borderRadius: '16px',
                    border: '1px solid #c4827e'
                  }}
                >
                  <div className="card-body p-4 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <span 
                          className="badge mb-2 px-3 py-1 fw-bold text-uppercase"
                          style={{ backgroundColor: miembro.colorBadge, color: miembro.colorBadge === '#e3c0be' ? '#443434' : '#ffffff' }}
                        >
                          {miembro.cargo}
                        </span>
                        <h4 className="fw-bold text-white mb-1">{miembro.titular}</h4>
                        <small className="fw-bold text-warning d-block">{miembro.rol}</small>
                      </div>
                      <span className="badge bg-dark text-light border border-secondary">
                        {miembro.cantidad}
                      </span>
                    </div>

                    <p className="my-2" style={{ color: '#d7cdbb', fontSize: '0.95rem' }}>
                      <strong className="text-white">Responsabilidades principales:</strong> {miembro.funciones}
                    </p>

                    <div 
                      className="mt-auto p-3 rounded-3" 
                      style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', borderLeft: `4px solid ${miembro.colorBadge}` }}
                    >
                      <small className="d-block fw-bold text-warning mb-1">📊 Flujo Actual de Información:</small>
                      <span className="small text-light" style={{ fontSize: '0.88rem' }}>
                        {miembro.gestionActual}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};