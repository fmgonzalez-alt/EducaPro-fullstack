import React, { useState, useEffect } from 'react';
import { getProductos, addProducto, deleteProducto } from '../data/db';

export const AdminDashboard = () => {
  const [cursos, setCursos] = useState([]);
  const [nuevoCurso, setNuevoCurso] = useState({
    nombre: '',
    area: 'Tecnología',
    duracion: '',
    precio: '',
    capacidadMax: '',
    profesor: '',
    estado: 'Matriculado',
    imagen: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=500&auto=format&fit=crop'
  });

  useEffect(() => {
    setCursos(getProductos());
  }, []);

  const handleChange = (e) => {
    setNuevoCurso({ ...nuevoCurso, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nuevoCurso.nombre || !nuevoCurso.precio || !nuevoCurso.profesor) return;
    const actualizados = addProducto({
      ...nuevoCurso,
      duracion: Number(nuevoCurso.duracion),
      precio: Number(nuevoCurso.precio),
      capacidadMax: Number(nuevoCurso.capacidadMax)
    });
    setCursos(actualizados);
    setNuevoCurso({
      nombre: '',
      area: 'Tecnología',
      duracion: '',
      precio: '',
      capacidadMax: '',
      profesor: '',
      estado: 'Matriculado',
      imagen: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=500&auto=format&fit=crop'
    });
  };

  const handleDelete = (id) => {
    const actualizados = deleteProducto(id);
    setCursos(actualizados);
  };

  return (
    <div className="container my-4">
      <h2 className="fw-bold mb-4">Panel Académico - Gestión de Cursos</h2>

      <div className="row g-4">
        {/* Formulario */}
        <div className="col-12 col-lg-4">
          <div className="card shadow-sm border-0 p-3">
            <h5 className="fw-bold mb-3">Nuevo Curso</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="form-label small fw-semibold">Nombre del Curso</label>
                <input type="text" className="form-control form-control-sm" name="nombre" value={nuevoCurso.nombre} onChange={handleChange} required />
              </div>
              <div className="mb-2">
                <label className="form-label small fw-semibold">Área</label>
                <select className="form-select form-select-sm" name="area" value={nuevoCurso.area} onChange={handleChange}>
                  <option value="Tecnología">Tecnología</option>
                  <option value="Diseño">Diseño</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Oficios Técnicos">Oficios Técnicos</option>
                  <option value="Administración">Administración</option>
                </select>
              </div>
              <div className="mb-2">
                <label className="form-label small fw-semibold">Profesor Asignado</label>
                <input type="text" className="form-control form-control-sm" name="profesor" value={nuevoCurso.profesor} onChange={handleChange} required />
              </div>
              <div className="row g-2 mb-2">
                <div className="col-6">
                  <label className="form-label small fw-semibold">Horas</label>
                  <input type="number" className="form-control form-control-sm" name="duracion" value={nuevoCurso.duracion} onChange={handleChange} required />
                </div>
                <div className="col-6">
                  <label className="form-label small fw-semibold">Capacidad</label>
                  <input type="number" className="form-control form-control-sm" name="capacidadMax" value={nuevoCurso.capacidadMax} onChange={handleChange} required />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label small fw-semibold">Precio (CLP)</label>
                <input type="number" className="form-control form-control-sm" name="precio" value={nuevoCurso.precio} onChange={handleChange} required />
              </div>
              <button type="submit" className="btn btn-primary w-100 btn-sm">Guardar Curso</button>
            </form>
          </div>
        </div>

        {/* Tabla */}
        <div className="col-12 col-lg-8">
          <div className="card shadow-sm border-0 p-3 table-responsive">
            <h5 className="fw-bold mb-3">Cursos Registrados</h5>
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Curso</th>
                  <th>Área</th>
                  <th>Profesor</th>
                  <th>Precio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cursos.map((c) => (
                  <tr key={c.id}>
                    <td><code>{c.codigo || c.id}</code></td>
                    <td className="fw-semibold">{c.nombre}</td>
                    <td><span className="badge bg-light text-dark border">{c.area}</span></td>
                    <td>{c.profesor}</td>
                    <td>${c.precio?.toLocaleString('es-CL')}</td>
                    <td>
                      <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(c.id)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};