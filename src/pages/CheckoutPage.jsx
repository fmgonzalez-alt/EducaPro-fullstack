import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CheckoutPage = ({ cart, onRemove, onClear }) => {
  const navigate = useNavigate();
  const [metodoPago, setMetodoPago] = useState('');
  const [nombreAlumno, setNombreAlumno] = useState('');
  const [rutAlumno, setRutAlumno] = useState('');

  const total = cart.reduce((acc, curr) => acc + curr.precio, 0);

  const handleSubmitPago = (e) => {
    e.preventDefault();

    if (!metodoPago) {
      alert('⚠️ DEBES SELECCIONAR UN MÉTODO DE PAGO OBLIGATORIAMENTE (Efectivo, Débito o Crédito).');
      return;
    }

    if (!nombreAlumno || !rutAlumno) {
      alert('Por favor, ingresa el nombre y RUT del alumno.');
      return;
    }

    onClear();
    navigate('/pago-exitoso');
  };

  if (cart.length === 0) {
    return (
      <div className="container my-5 text-center">
        <div className="card shadow-sm p-5 max-w-lg mx-auto">
          <h4>No tienes cursos seleccionados para pago.</h4>
          <p className="text-muted">Ve a Categorías y presiona "Matricular" en la asignatura deseada.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="fw-bold mb-4">💳 Pago Institucional y Matrícula</h2>
      
      <div className="row g-4">
        {/* Lista de Cursos seleccionados */}
        <div className="col-12 col-lg-7">
          <div className="card shadow-sm border-0 p-3 mb-3">
            <h5 className="fw-bold mb-3">Cursos Seleccionados</h5>
            {cart.map((item) => (
              <div key={item.id} className="d-flex justify-content-between align-items-center border-bottom py-2">
                <div>
                  <h6 className="fw-bold mb-0">{item.nombre}</h6>
                  <small className="text-muted">Código: {item.id} | Profesor: {item.profesor}</small>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <span className="fw-bold text-success">${item.precio.toLocaleString('es-CL')} CLP</span>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => onRemove(item.id)}>
                    Quitar
                  </button>
                </div>
              </div>
            ))}
            <div className="d-flex justify-content-between align-items-center pt-3 fw-bold fs-5">
              <span>Total a Pagar:</span>
              <span className="text-success">${total.toLocaleString('es-CL')} CLP</span>
            </div>
          </div>
        </div>

        {/* Formulario de Pago Obligatorio */}
        <div className="col-12 col-lg-5">
          <div className="card shadow-sm border-0 p-4">
            <h5 className="fw-bold mb-3">Datos del Estudiante y Selección de Pago</h5>
            <form onSubmit={handleSubmitPago}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Nombre Completo del Estudiante *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={nombreAlumno}
                  onChange={(e) => setNombreAlumno(e.target.value)}
                  placeholder="Ej: Juan Pérez" 
                  required 
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">RUT del Estudiante *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={rutAlumno}
                  onChange={(e) => setRutAlumno(e.target.value)}
                  placeholder="Ej: 12.345.678-9" 
                  required 
                />
              </div>

              {/* MÉTODOS DE PAGO OBLIGATORIOS */}
              <div className="mb-4">
                <label className="form-label fw-bold text-danger">Método de Pago Obligatorio *</label>
                <div className="d-flex flex-column gap-2">
                  <div className="form-check p-2 border rounded">
                    <input 
                      className="form-check-input ms-1" 
                      type="radio" 
                      name="metodoPago" 
                      id="pagoEfectivo" 
                      value="Efectivo"
                      onChange={(e) => setMetodoPago(e.target.value)}
                    />
                    <label className="form-check-label ms-2 fw-semibold" htmlFor="pagoEfectivo">
                      💵 Efectivo (Pago Presencial en Caja Institucional)
                    </label>
                  </div>

                  <div className="form-check p-2 border rounded">
                    <input 
                      className="form-check-input ms-1" 
                      type="radio" 
                      name="metodoPago" 
                      id="pagoDebito" 
                      value="Débito"
                      onChange={(e) => setMetodoPago(e.target.value)}
                    />
                    <label className="form-check-label ms-2 fw-semibold" htmlFor="pagoDebito">
                      💳 Débito (Redcompra / Webpay)
                    </label>
                  </div>

                  <div className="form-check p-2 border rounded">
                    <input 
                      className="form-check-input ms-1" 
                      type="radio" 
                      name="metodoPago" 
                      id="pagoCredito" 
                      value="Crédito"
                      onChange={(e) => setMetodoPago(e.target.value)}
                    />
                    <label className="form-check-label ms-2 fw-semibold" htmlFor="pagoCredito">
                      💳 Crédito (Hasta 12 cuotas sin interés)
                    </label>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-success w-100 fw-bold py-2 fs-5">
                Confirmar y Pagar Matrícula
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};