import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export const PagoExitoso = () => {
  const location = useLocation();
  const comprobante = location.state?.comprobante;

  if (!comprobante) {
    return (
      <div className="container text-center my-5">
        <h4>No se registra información de pago.</h4>
        <Link to="/" className="btn btn-primary mt-3">Volver al Inicio</Link>
      </div>
    );
  }

  return (
    <div className="container my-5" style={{ maxWidth: '800px' }}>
      <div className="card shadow-sm border-0 p-4">
        <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-3">
          <div>
            <h3 className="fw-bold text-success mb-1">✓ Pago Institucional Realizado</h3>
            <p className="text-muted small m-0">N° Comprobante: <strong>#{comprobante.idOperacion}</strong></p>
          </div>
          <span className="badge bg-success fs-6">Aprobado</span>
        </div>

        <div className="row g-3 mb-4 bg-light p-3 rounded">
          <div className="col-md-4">
            <small className="text-muted d-block">Estudiante</small>
            <strong>{comprobante.estudiante}</strong>
          </div>
          <div className="col-md-4">
            <small className="text-muted d-block">RUT</small>
            <strong>{comprobante.rut}</strong>
          </div>
          <div className="col-md-4">
            <small className="text-muted d-block">Correo</small>
            <strong>{comprobante.correo}</strong>
          </div>
          <div className="col-md-6">
            <small className="text-muted d-block">Sede</small>
            <strong>{comprobante.sede}</strong>
          </div>
          <div className="col-md-6">
            <small className="text-muted d-block">Medio de Pago</small>
            <strong>{comprobante.metodoPago}</strong>
          </div>
        </div>

        <h5 className="fw-bold mb-3 text-secondary">Detalle de Cursos Pagados</h5>
        <div className="table-responsive mb-4">
          <table className="table table-bordered align-middle">
            <thead className="table-light small">
              <tr>
                <th>Curso</th>
                <th>Código</th>
                <th>Profesor</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {comprobante.cursos.map((c) => (
                <tr key={c.id}>
                  <td className="fw-semibold">{c.nombre}</td>
                  <td><code>{c.codigo}</code></td>
                  <td>{c.profesor}</td>
                  <td className="text-success fw-bold">${c.precio?.toLocaleString('es-CL')} CLP</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-between align-items-center bg-light p-3 rounded mb-4">
          <span className="fw-bold fs-5">Total Pagado:</span>
          <span className="fw-bold fs-4 text-success">${comprobante.total.toLocaleString('es-CL')} CLP</span>
        </div>

        <div className="d-flex gap-2 justify-content-end">
          <button className="btn btn-outline-danger btn-sm" onClick={() => window.print()}>
            📄 Imprimir Comprobante PDF
          </button>
          <Link to="/" className="btn btn-primary btn-sm">
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
};