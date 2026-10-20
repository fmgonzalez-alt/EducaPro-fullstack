import React, { useState } from 'react';

export const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    rut: '',
    telefono: '',
    email: '',
    metodoPago: 'Débito'
  });

  const [errores, setErrores] = useState({});

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: '' });
  };

  const validarFormulario = () => {
    let nuevosErrores = {};

    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre completo es obligatorio.';
    }

    if (!formData.rut.trim() || formData.rut.length < 7) {
      nuevosErrores.rut = 'Ingresa un RUT válido.';
    }

    const regexTel = /^[+]?[0-9]{8,12}$/;
    if (!regexTel.test(formData.telefono.replace(/\s/g, ''))) {
      nuevosErrores.telefono = 'Ingresa un teléfono válido de 8 a 12 dígitos.';
    }

    const emailTrim = formData.email.trim().toLowerCase();
    const regexEmailStrict = /^[a-zA-Z0-9._%+-]+@(gmail|outlook)\.[a-zA-Z]{2,}$/;

    if (!emailTrim.includes('.')) {
      nuevosErrores.email = 'Te faltó agregar la extensión (.com o .cl) al final del correo.';
    } else if (!regexEmailStrict.test(emailTrim)) {
      nuevosErrores.email = 'El correo debe ser válido y terminar en @gmail o @outlook (.com/.cl).';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      onLoginSuccess(formData);
      onClose();
    }
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow-lg border-0 rounded-4">
          <div className="modal-header bg-dark text-white rounded-top-4">
            <h5 className="modal-title fw-bold">🔐 Registro / Inicio de Sesión</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body p-4">

              {/* Nombre Completo */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Nombre Completo *</label>
                <input 
                  type="text" 
                  name="nombre" 
                  className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                  placeholder="Ej: Fernanda González"
                  value={formData.nombre}
                  onChange={handleChange}
                />
                {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
              </div>

              {/* RUT y Teléfono */}
              <div className="row g-2 mb-3">
                <div className="col-6">
                  <label className="form-label fw-semibold">RUT *</label>
                  <input 
                    type="text" 
                    name="rut" 
                    className={`form-control ${errores.rut ? 'is-invalid' : ''}`}
                    placeholder="12.345.678-9"
                    value={formData.rut}
                    onChange={handleChange}
                  />
                  {errores.rut && <div className="invalid-feedback">{errores.rut}</div>}
                </div>
                <div className="col-6">
                  <label className="form-label fw-semibold">Teléfono *</label>
                  <input 
                    type="text" 
                    name="telefono" 
                    className={`form-control ${errores.telefono ? 'is-invalid' : ''}`}
                    placeholder="+56912345678"
                    value={formData.telefono}
                    onChange={handleChange}
                  />
                  {errores.telefono && <div className="invalid-feedback">{errores.telefono}</div>}
                </div>
              </div>

              {/* Correo Electrónico */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Correo Electrónico (@gmail / @outlook) *</label>
                <input 
                  type="email" 
                  name="email" 
                  className={`form-control ${errores.email ? 'is-invalid' : ''}`}
                  placeholder="ejemplo@gmail.com o @outlook.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errores.email && <div className="invalid-feedback">{errores.email}</div>}
              </div>

              {/* Método de Pago Preferido */}
              <div className="mb-2">
                <label className="form-label fw-semibold">Método de Pago Preferido *</label>
                <select 
                  name="metodoPago" 
                  className="form-select"
                  value={formData.metodoPago}
                  onChange={handleChange}
                >
                  <option value="Efectivo">💵 Efectivo (Pago Presencial en Caja)</option>
                  <option value="Débito">💳 Débito (Redcompra / Webpay)</option>
                  <option value="Crédito">💳 Crédito (Hasta 12 cuotas)</option>
                </select>
              </div>

            </div>

            <div className="modal-footer bg-light rounded-bottom-4">
              <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>Cancelar</button>
              <button type="submit" className="btn btn-primary fw-bold px-4">Ingresar / Registrarse</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};