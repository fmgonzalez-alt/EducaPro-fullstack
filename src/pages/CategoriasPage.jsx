import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PagoTarjetaModal } from '../components/PagoTarjetaModal';

export const CategoriasPage = ({ onAddToCart, isLoggedIn, onOpenLogin }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const areaParam = queryParams.get('area') || 'Tecnología';

  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [isPagoModalOpen, setIsPagoModalOpen] = useState(false);
  const [isHoveredBtn, setIsHoveredBtn] = useState(false);

  // Paleta de colores elegante (Design Seeds Hydrangea Palette)
  const temasCategorias = {
    'Tecnología': {
      bgBackground: 'linear-gradient(135deg, #181e33 0%, #212842 100%)',
      cardBg: '#212842',
      accentColor: '#9db1b9',
      btnColor: '#3d5170',
      textColor: '#f1f5f9',
      subtextColor: '#cbd5e1',
      badgeBg: '#1e2638',
      borderColor: '#333e5c'
    },
    'Diseño': {
      bgBackground: 'linear-gradient(135deg, #6e3d4c 0%, #ab6379 100%)',
      cardBg: '#7e4857',
      accentColor: '#e0c2cb',
      btnColor: '#ab6379',
      textColor: '#ffffff',
      subtextColor: '#f1d6de',
      badgeBg: '#592f3c',
      borderColor: '#945365'
    },
    'Marketing': {
      bgBackground: 'linear-gradient(135deg, #42202c 0%, #6e3b52 100%)',
      cardBg: '#592e42',
      accentColor: '#d6aab8',
      btnColor: '#6e3b52',
      textColor: '#ffffff',
      subtextColor: '#e8cb2f',
      badgeBg: '#361823',
      borderColor: '#824862'
    },
    'Oficios Técnicos': {
      bgBackground: 'linear-gradient(135deg, #364963 0%, #557096 100%)',
      cardBg: '#445b7c',
      accentColor: '#c8d5dc',
      btnColor: '#557096',
      textColor: '#ffffff',
      subtextColor: '#d9e2e8',
      badgeBg: '#29384d',
      borderColor: '#6280aa'
    },
    'Administración': {
      bgBackground: 'linear-gradient(135deg, #788c94 0%, #9db1b9 100%)',
      cardBg: '#8a9ea6',
      accentColor: '#212842',
      btnColor: '#212842',
      textColor: '#ffffff',
      subtextColor: '#181e33',
      badgeBg: '#5c6f77',
      borderColor: '#adbfc6'
    }
  };

  const temaActual = temasCategorias[areaParam] || temasCategorias['Tecnología'];

  // PANTALLA DE BLOQUEO CON NEÓN ROJO EXTERIOR IMPONENTE Y FONDO NEGRO
  if (!isLoggedIn) {
    return (
      <div 
        className="d-flex align-items-center justify-content-center px-3"
        style={{ 
          backgroundColor: '#000000', 
          minHeight: 'calc(100vh - 60px)', 
          paddingTop: '2rem', 
          paddingBottom: '3rem' 
        }}
      >
        <div 
          className="p-5 text-center rounded-4"
          style={{ 
            maxWidth: '650px',
            width: '100%',
            backgroundColor: '#0d0d0f', 
            border: '2px solid #ff0055',
            // Resplandor Neón rojo exterior multicapa
            boxShadow: '0 0 15px #ff0055, 0 0 30px #ff0055, 0 0 50px #ff0033, 0 0 70px #ff0033',
            borderRadius: '24px'
          }}
        >
          {/* Símbolo de advertencia Neón */}
          <div 
            className="mb-4 display-1"
            style={{ 
              color: '#ffe600',
              textShadow: '0 0 15px #ffe600, 0 0 30px #ffe600, 0 0 45px #ff9900',
              fontWeight: 'bold',
              lineHeight: 1
            }}
          >
            ⚠️
          </div>

          {/* Título y Descripción */}
          <h3 
            className="fw-bold mb-3"
            style={{ 
              color: '#ffffff', 
              letterSpacing: '0.5px',
              fontSize: '1.65rem'
            }}
          >
            UPS SURGIÓ UN INCONVENIENTE: AÚN NO HAS INICIADO SESIÓN PARA VER LAS CATEGORÍAS
          </h3>

          <p className="mb-4" style={{ color: '#a1a1aa', fontSize: '1rem' }}>
            Por favor, inicia sesión con tu cuenta institucional o crea una para poder acceder a la oferta completa de cursos por categoría.
          </p>

          {/* Botón interactivo con aumento de tamaño y brillo Neón en Hover */}
          <button 
            className="btn fw-bold py-3 px-4 rounded-3 border-0"
            style={{ 
              backgroundColor: isHoveredBtn ? '#00f0ff' : '#0066ff', 
              color: '#ffffff',
              fontSize: '1.1rem',
              transform: isHoveredBtn ? 'scale(1.08)' : 'scale(1)',
              boxShadow: isHoveredBtn 
                ? '0 0 30px #00f0ff, 0 0 50px #00f0ff' 
                : '0 0 15px rgba(0, 102, 255, 0.6)',
              transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              cursor: 'pointer'
            }}
            onMouseEnter={() => setIsHoveredBtn(true)}
            onMouseLeave={() => setIsHoveredBtn(false)}
            onClick={onOpenLogin}
          >
            IR A INICIAR SESIÓN / CREAR CUENTA
          </button>
        </div>
      </div>
    );
  }

  const todosLosCursos = [
    {
      id: 'CRS001',
      nombre: 'Fundamentos de Programación',
      area: 'Tecnología',
      duracion: '40 horas',
      precio: 250000,
      capacidad: '25 alumnos',
      profesor: 'Juan López',
      descripcion: 'Lógica de programación, algoritmos y estructuras de datos principales.',
      metodosPago: 'Efectivo, Débito, Crédito',
      imagen: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 'CRS002',
      nombre: 'Diseño Gráfico Digital',
      area: 'Diseño',
      duracion: '35 horas',
      precio: 220000,
      capacidad: '20 alumnos',
      profesor: 'María González',
      descripcion: 'Herramientas de diseño para creación de identidades visuales e ilustración digital.',
      metodosPago: 'Efectivo, Débito, Crédito',
      imagen: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 'CRS003',
      nombre: 'Marketing Digital',
      area: 'Marketing',
      duracion: '30 horas',
      precio: 200000,
      capacidad: '25 alumnos',
      profesor: 'Carlos Soto',
      descripcion: 'Estrategias de posicionamiento web, campañas en redes sociales y analítica.',
      metodosPago: 'Efectivo, Débito, Crédito',
      imagen: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 'CRS004',
      nombre: 'Electrónica Básica',
      area: 'Oficios Técnicos',
      duracion: '45 horas',
      precio: 280000,
      capacidad: '15 alumnos',
      profesor: 'Luis Pérez',
      descripcion: 'Circuitos eléctricos, componentes electrónicos y medición con multímetro.',
      metodosPago: 'Efectivo, Débito, Crédito',
      imagen: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 'CRS005',
      nombre: 'Gestión de Proyectos',
      area: 'Administración',
      duracion: '35 horas',
      precio: 230000,
      capacidad: '20 alumnos',
      profesor: 'Ana Rodríguez',
      descripcion: 'Gestión de proyectos bajo metodologías ágiles y tradicionales.',
      metodosPago: 'Efectivo, Débito, Crédito',
      imagen: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop'
    }
  ];

  const normalizar = (texto) => 
    texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

  const cursosFiltrados = todosLosCursos.filter(
    c => normalizar(c.area) === normalizar(areaParam)
  );

  const handleAbrirPagoTarjeta = (curso) => {
    setCursoSeleccionado(curso);
    setIsPagoModalOpen(true);
  };

  return (
    <div 
      style={{ 
        background: temaActual.bgBackground, 
        minHeight: 'calc(100vh - 60px)', 
        paddingTop: '2.5rem', 
        paddingBottom: '3.5rem',
        transition: 'all 0.5s ease'
      }}
    >
      <div className="container">
        {/* Encabezado Armónico */}
        <div 
          className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom"
          style={{ borderColor: temaActual.borderColor }}
        >
          <div>
            <span 
              className="badge mb-2 px-3 py-2 fw-bold text-uppercase shadow-sm"
              style={{ backgroundColor: temaActual.badgeBg, color: '#ffffff' }}
            >
              Área Académica
            </span>
            <h2 className="fw-bold m-0" style={{ color: temaActual.textColor }}>
              Categoría: <span style={{ color: temaActual.accentColor }}>{areaParam}</span>
            </h2>
          </div>
          <span className="small fw-semibold" style={{ color: temaActual.subtextColor }}>
            {cursosFiltrados.length} curso(s) disponible(s)
          </span>
        </div>

        {/* Tarjetas Ejecutivas */}
        <div className="row g-4">
          {cursosFiltrados.map((item) => (
            <div key={item.id} className="col-12">
              <div 
                className="card shadow-lg border-0 overflow-hidden" 
                style={{ 
                  backgroundColor: temaActual.cardBg, 
                  borderRadius: '16px',
                  border: `1px solid ${temaActual.borderColor}`
                }}
              >
                <div className="row g-0">
                  <div className="col-md-5">
                    <img 
                      src={item.imagen} 
                      className="img-fluid h-100 w-100" 
                      style={{ objectFit: 'cover', minHeight: '260px' }} 
                      alt={item.nombre} 
                    />
                  </div>
                  <div className="col-md-7">
                    <div className="card-body p-4 d-flex flex-column h-100">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <span 
                            className="badge mb-2" 
                            style={{ backgroundColor: temaActual.badgeBg, color: '#ffffff' }}
                          >
                            {item.area}
                          </span>
                          <h3 className="fw-bold mb-0" style={{ color: temaActual.textColor }}>{item.nombre}</h3>
                          <small style={{ color: temaActual.subtextColor }}>Código: {item.id}</small>
                        </div>
                        <span 
                          className="fs-5 fw-bold px-3 py-2 rounded-3 border shadow-sm"
                          style={{ 
                            color: temaActual.textColor, 
                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            borderColor: temaActual.borderColor
                          }}
                        >
                          ${item.precio.toLocaleString('es-CL')} CLP
                        </span>
                      </div>

                      <p className="my-3" style={{ color: temaActual.subtextColor }}>
                        <strong style={{ color: temaActual.textColor }}>Descripción:</strong> {item.descripcion}
                      </p>

                      <div 
                        className="row g-2 my-2 p-3 rounded-3" 
                        style={{ backgroundColor: 'rgba(0,0,0,0.2)', border: `1px solid ${temaActual.borderColor}` }}
                      >
                        <div className="col-12 col-md-6">
                          <small className="d-block" style={{ color: temaActual.subtextColor }}>Profesor Asignado:</small>
                          <strong style={{ color: temaActual.textColor }}>👨‍🏫 {item.profesor}</strong>
                        </div>
                        <div className="col-12 col-md-6">
                          <small className="d-block" style={{ color: temaActual.subtextColor }}>Duración y Capacidad:</small>
                          <strong style={{ color: temaActual.textColor }}>⏱️ {item.duracion} | 👥 {item.capacidad}</strong>
                        </div>
                        <div className="col-12 mt-2 pt-2 border-top" style={{ borderColor: temaActual.borderColor }}>
                          <small className="d-block" style={{ color: temaActual.subtextColor }}>Métodos de Pago Aceptados:</small>
                          <span className="small fw-semibold" style={{ color: temaActual.accentColor }}>💳 {item.metodosPago}</span>
                        </div>
                      </div>

                      <div className="mt-auto pt-3 d-flex justify-content-end">
                        <button 
                          className="btn fw-bold px-4 py-2 shadow border-0"
                          style={{ 
                            backgroundColor: temaActual.btnColor, 
                            color: '#ffffff',
                            borderRadius: '10px'
                          }}
                          onClick={() => handleAbrirPagoTarjeta(item)}
                        >
                          Matricular
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de Pago de Tarjeta */}
        <PagoTarjetaModal 
          isOpen={isPagoModalOpen}
          onClose={() => setIsPagoModalOpen(false)}
          curso={cursoSeleccionado}
          onPagoExitoso={(curso) => onAddToCart(curso)}
        />
      </div>
    </div>
  );
};