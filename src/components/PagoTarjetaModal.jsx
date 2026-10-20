import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const PagoTarjetaModal = ({ isOpen, onClose, curso, onPagoExitoso }) => {
  const navigate = useNavigate();
  const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [fechaExp, setFechaExp] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');

  if (!isOpen || !curso) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const numLimpio = numeroTarjeta.replace(/\s/g, '');
    if (numLimpio.length < 15 || numLimpio.length > 16 || isNaN(numLimpio)) {
      setError('Ingresa un número de tarjeta válido (15 o 16 dígitos).');
      return;
    }

    if (!fechaExp || !fechaExp.includes('/') || fechaExp.length < 5) {
      setError('Ingresa una fecha de vencimiento válida (MM/AA).');
      return;
    }

    if (!cvv || cvv.length < 3 || isNaN(cvv)) {
      setError('Ingresa un código CVV válido (3 o 4 dígitos).');
      return;
    }

    setError('');
    onPagoExitoso(curso);
    onClose();
    navigate('/pago-exitoso');
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.65)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow-lg border-0 rounded-4">
          <div className="modal-header bg-success text-white rounded-top-4">
            <h5 className="modal-title fw-bold">💳 Pago de Matrícula con Tarjeta</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body p-4">
              <div className="bg-light p-3 rounded mb-3 border">
                <h6 className="fw-bold mb-1 text-dark">{curso.nombre}</h6>
                <p className="small text-muted mb-1">Código: {curso.id} | Profesor: {curso.profesor}</p>
                <p className="fw-bold text-success mb-0 fs-5">${curso.precio.toLocaleString('es-CL')} CLP</p>
              </div>

              {error && <div className="alert alert-danger py-2 small mb-3">{error}</div>}

              {/* Número de Tarjeta */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Número de Tarjeta *</label>
                <input 
                  type="text" 
                  className="form-control"
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  value={numeroTarjeta}
                  onChange={(e) => setNumeroTarjeta(e.target.value)}
                  required
                />
              </div>

              {/* Fecha y CVV */}
              <div className="row g-2 mb-3">
                <div className="col-6">
                  <label className="form-label fw-semibold">Vencimiento (MM/AA) *</label>
                  <input 
                    type="text" 
                    className="form-control"
                    placeholder="12/28"
                    maxLength="5"
                    value={fechaExp}
                    onChange={(e) => setFechaExp(e.target.value)}
                    required
                  />
                </div>
                <div className="col-6">
                  <label className="form-label fw-semibold">CVV *</label>
                  <input 
                    type="password" 
                    className="form-control"
                    placeholder="123"
                    maxLength="4"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    required
                  />
                </div>
              </div>

            </div>

            <div className="modal-footer bg-light rounded-bottom-4">
              <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>Cancelar</button>
              <button type="submit" className="btn btn-success fw-bold px-4">Pagar Matrícula</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};