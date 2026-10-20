import React, { useState } from 'react';

export const AjustesPage = ({ user, isLoggedIn, onOpenLogin, onUpdateUser }) => {
  // Manejo seguro si no hay sesión iniciada o el usuario es null
  if (!isLoggedIn || !user) {
    return (
      <div 
        className="d-flex align-items-center justify-content-center px-3"
        style={{ backgroundColor: '#181414', minHeight: 'calc(100vh - 60px)', color: '#d7cdbb' }}
      >
        <div 
          className="p-5 text-center rounded-4 shadow-lg"
          style={{ maxWidth: '600px', backgroundColor: '#443434', border: '1px solid #c4827e' }}
        >
          <div className="display-3 mb-3">🔒</div>
          <h3 className="fw-bold text-white mb-3">Acceso Restringido a Ajustes</h3>
          <p className="mb-4" style={{ color: '#e3c0be' }}>
            Debes iniciar sesión con tu cuenta institucional para gestionar tus datos de usuario y métodos de pago.
          </p>
          <button 
            className="btn fw-bold px-4 py-2 border-0"
            style={{ backgroundColor: '#c4827e', color: '#ffffff' }}
            onClick={onOpenLogin}
          >
            Iniciar Sesión / Crear Cuenta
          </button>
        </div>
      </div>
    );
  }

  // Valores por defecto seguros con encadenamiento opcional
  const userEmail = user?.email || 'usuario@educapro.cl';
  const userRut = user?.rut || '19.876.543-2';

  const [nombre, setNombre] = useState(user?.nombre || '');
  const [telefono, setTelefono] = useState(user?.telefono || '+56 9 1234 5678');
  const [metodoPago, setMetodoPago] = useState(user?.metodoPago || 'Tarjeta de Crédito');
  const [numeroTarjeta, setNumeroTarjeta] = useState(user?.numeroTarjeta || '**** **** **** 4589');
  
  const [ultimaModificacion, setUltimaModificacion] = useState(() => {
    const savedDate = localStorage.getItem(`last_profile_update_${userEmail}`);
    return savedDate ? new Date(savedDate) : new Date(2026, 8, 15);
  });

  const [mensajeEstado, setMensajeEstado] = useState(null);

  const hoy = new Date();
  const diferenciaTiempo = hoy.getTime() - ultimaModificacion.getTime();
  const diasTranscurridos = Math.floor(diferenciaTiempo / (1000 * 3600 * 24));
  const puedeModificar = diasTranscurridos >= 30;
  const diasRestantes = 30 - diasTranscurridos;

  const handleGuardarAjustes = (e) => {
    e.preventDefault();

    if (!puedeModificar) {
      setMensajeEstado({
        tipo: 'danger',
        texto: `⚠️ Restricción de Seguridad: Solo puedes modificar tus datos una vez cada 30 días. Podrás realizar cambios en ${diasRestantes} día(s).`
      });
      return;
    }

    const fechaNueva = new Date();
    localStorage.setItem(`last_profile_update_${userEmail}`, fechaNueva.toISOString());
    setUltimaModificacion(fechaNueva);

    if (onUpdateUser) {
      onUpdateUser({
        ...user,
        nombre,
        telefono,
        metodoPago,
        numeroTarjeta
      });
    }

    setMensajeEstado({
      tipo: 'success',
      texto: '✅ ¡Ajustes actualizados correctamente!'
    });
  };

  return (
    <div 
      style={{ 
        backgroundColor: '#181414', 
        color: '#d7cdbb',
        minHeight: 'calc(100vh - 60px)', 
        paddingTop: '3.5rem', 
        paddingBottom: '4rem' 
      }}
    >
      <div className="container" style={{ maxWidth: '850px' }}>
        <div 
          className="p-4 p-md-5 rounded-4 shadow-lg"
          style={{ backgroundColor: '#443434', border: '1px solid #c4827e' }}
        >
          <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom" style={{ borderColor: '#c4827e' }}>
            <div>
              <span 
                className="badge mb-2 px-3 py-2 fw-bold text-uppercase shadow-sm"
                style={{ backgroundColor: '#c4827e', color: '#ffffff' }}
              >
                Configuración de Perfil
              </span>
              <h2 className="fw-bold text-white m-0">Ajustes de Usuario y Pagos</h2>
            </div>
            <span className="badge bg-dark text-warning border border-warning px-3 py-2">
              📅 Cambio mensual permitido
            </span>
          </div>

          <div 
            className="p-3 mb-4 rounded-3 d-flex align-items-center gap-3"
            style={{ 
              backgroundColor: puedeModificar ? 'rgba(40, 167, 69, 0.15)' : 'rgba(220, 53, 69, 0.2)',
              borderLeft: `4px solid ${puedeModificar ? '#28a745' : '#dc3545'}`
            }}
          >
            <span className="fs-3">{puedeModificar ? '🔓' : '🔒'}</span>
            <div>
              <strong className="d-block text-white">
                {puedeModificar ? 'Edición Habilitada' : 'Edición Bloqueada Temporalmente'}
              </strong>
              <small style={{ color: '#e3c0be' }}>
                {puedeModificar 
                  ? 'Puedes realizar cambios en tu información institucional y método de pago hoy.' 
                  : `Última modificación realizada el ${ultimaModificacion.toLocaleDateString('es-CL')}. Debes esperar ${diasRestantes} día(s) para editar.`}
              </small>
            </div>
          </div>

          {mensajeEstado && (
            <div className={`alert alert-${mensajeEstado.tipo} fw-bold mb-4 shadow-sm`} role="alert">
              {mensajeEstado.texto}
            </div>
          )}

          <form onSubmit={handleGuardarAjustes}>
            <h5 className="fw-bold text-white mb-3 border-bottom pb-2" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              1. Información Institucional
            </h5>

            <div className="row g-3 mb-4">
              <div className="col-12 col-md-6">
                <label className="form-label text-light small fw-bold">Nombre Completo</label>
                <input 
                  type="text" 
                  className="form-control"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  disabled={!puedeModificar}
                  required 
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label text-light small fw-bold">Correo Institucional</label>
                <input 
                  type="email" 
                  className="form-control bg-dark text-muted border-secondary"
                  value={userEmail}
                  disabled 
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label text-light small fw-bold">Teléfono de Contacto</label>
                <input 
                  type="text" 
                  className="form-control"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  disabled={!puedeModificar}
                  required 
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label text-light small fw-bold">RUT / Identificación</label>
                <input 
                  type="text" 
                  className="form-control bg-dark text-muted border-secondary"
                  value={userRut}
                  disabled 
                />
              </div>
            </div>

            <h5 className="fw-bold text-white mb-3 border-bottom pb-2" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              2. Método de Pago Preferente
            </h5>

            <div className="row g-3 mb-4">
              <div className="col-12 col-md-6">
                <label className="form-label text-light small fw-bold">Tipo de Medio de Pago</label>
                <select 
                  className="form-select"
                  value={metodoPago}
                  onChange={(e) => setMetodoPago(e.target.value)}
                  disabled={!puedeModificar}
                >
                  <option value="Tarjeta de Crédito">💳 Tarjeta de Crédito</option>
                  <option value="Tarjeta de Débito (Redcompra)">💳 Tarjeta de Débito</option>
                  <option value="Transferencia Bancaria">🏦 Transferencia Bancaria</option>
                </select>
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label text-light small fw-bold">Número de Tarjeta / Identificador</label>
                <input 
                  type="text" 
                  className="form-control"
                  value={numeroTarjeta}
                  onChange={(e) => setNumeroTarjeta(e.target.value)}
                  disabled={!puedeModificar}
                  required 
                />
              </div>
            </div>

            <div className="text-end pt-3 border-top" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <button 
                type="submit" 
                className="btn fw-bold px-4 py-2 border-0"
                style={{ 
                  backgroundColor: puedeModificar ? '#c4827e' : '#6c757d', 
                  color: '#ffffff',
                  cursor: puedeModificar ? 'pointer' : 'not-allowed'
                }}
                disabled={!puedeModificar}
              >
                {puedeModificar ? 'Guardar Cambios' : 'Bloqueado (Espera 1 mes)'}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};