import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CheckoutPage = ({ cart, onRemove, onClear }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    rut: '',
    sede: 'Santiago',
    metodoPago: 'Transferencia Bancaria / Debito'
  });

  const total = cart.reduce((sum, item) => sum + item.precio, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert('Debes seleccionar al menos un programa para procesar el pago.');
    
    const comprobante = {
      idOperacion: `EP-PAGO-${Math.floor(100000 + Math.random() * 900000)}`,
      estudiante: `${form.nombre} ${form.apellidos}`,
      correo: form.correo,
      rut: form.rut,
      sede: form.sede,
      metodoPago: form.metodoPago,
      cursos: cart,
      total: total
    };

    onClear();
    navigate('/pago-exitoso', { state: { comprobante } });
  };

  return (
    <div className="container my-5" style={{ maxWidth: '850px' }}>
      <div className="card shadow-sm border-0 p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="fw-bold m-0 text-dark">Pago Institucional de Aranceles</h3>
          <span className="badge bg-primary fs-6">Total a pagar: ${total.toLocaleString('es-CL')} CLP</span>
        </div>
        <p className="text-muted small mb-4">Ingresa tus datos personales e institucionales para registrar el pago de tus asignaturas.</p>

        {/* Resumen de Asignaturas */}
        <h5 className="fw-bold mb-3 text-secondary">Desglose de Aranceles / Cursos</h5>
        <div className="table-responsive mb-4">
          <table className="table align-middle">
            <thead className="table-light small">
              <tr>
                <th>Curso</th>
                <th>Código</th>
                <th>Valor Arancel</th>
                <th className="text-end">Acción</th>
              </tr>
            </thead>
            <tbody>
              {cart.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center text-muted py-3">No hay asignaturas seleccionadas para pagar.</td>
                </tr>
              ) : (
                cart.map((curso) => (
                  <tr key={curso.id}>
                    <td className="fw-bold">{curso.nombre}</td>
                    <td><code>{curso.codigo}</code></td>
                    <td className="text-success fw-bold">${curso.precio?.toLocaleString('es-CL')} CLP</td>
                    <td className="text-end">
                      <button className="btn btn-outline-danger btn-sm" onClick={() => onRemove(curso.id)}>Quitar</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Formulario de Información del Estudiante */}
        <form onSubmit={handleSubmit}>
          <h5 className="fw-bold mb-3 text-secondary">Información del Estudiante</h5>
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Nombre*</label>
              <input type="text" className="form-control" name="nombre" onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Apellidos*</label>
              <input type="text" className="form-control" name="apellidos" onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Correo Institucional / Personal*</label>
              <input type="email" className="form-control" name="correo" onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">RUT Estudiante*</label>
              <input type="text" className="form-control" name="rut" placeholder="12.345.678-K" onChange={handleChange} required />
            </div>
          </div>

          <h5 className="fw-bold mb-3 text-secondary">Sede y Método de Pago</h5>
          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Sede Institucional*</label>
              <select className="form-select" name="sede" onChange={handleChange}>
                <option value="Santiago">Santiago</option>
                <option value="Valparaíso">Valparaíso</option>
                <option value="Concepción">Concepción</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-semibold">Medio de Pago*</label>
              <select className="form-select" name="metodoPago" onChange={handleChange}>
                <option value="Transferencia Bancaria / Debito">Webpay / Débito - Crédito</option>
                <option value="Convenio Pago Institucional">Convenio TNE / Becas EducaPro</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-success w-100 py-2 fw-bold fs-5" disabled={cart.length === 0}>
            Pagar Ahora ${total.toLocaleString('es-CL')} CLP
          </button>
        </form>
      </div>
    </div>
  );
};