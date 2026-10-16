import React, { useState, useEffect } from 'react';
import { getProductos, addProducto, deleteProducto } from '../data/db';

export const AdminDashboard = () => {
  const [productos, setProductos] = useState([]);
  const [nuevo, setNuevo] = useState({ nombre: '', precio: '', categoria: 'Juegos', stock: '' });

  useEffect(() => {
    setProductos(getProductos());
  }, []);

  const handleCreate = (e) => {
    e.preventDefault();
    const actualizados = addProducto({
      ...nuevo,
      precio: Number(nuevo.precio),
      stock: Number(nuevo.stock),
      imagen: 'https://via.placeholder.com/400x300'
    });
    setProductos(actualizados);
    setNuevo({ nombre: '', precio: '', categoria: 'Juegos', stock: '' });
  };

  const handleDelete = (id) => {
    const actualizados = deleteProducto(id);
    setProductos(actualizados);
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Panel Administrativo - MI TIENDA ONLINE ESTUDIANTE</h2>
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h4>Nuevo Producto</h4>
            <form onSubmit={handleCreate}>
              <div className="mb-2">
                <label className="form-label">Nombre</label>
                <input type="text" className="form-control" value={nuevo.nombre} onChange={e => setNuevo({...nuevo, nombre: e.target.value})} required />
              </div>
              <div className="mb-2">
                <label className="form-label">Precio ($)</label>
                <input type="number" className="form-control" value={nuevo.precio} onChange={e => setNuevo({...nuevo, precio: e.target.value})} required />
              </div>
              <div className="mb-2">
                <label className="form-label">Stock</label>
                <input type="number" className="form-control" value={nuevo.stock} onChange={e => setNuevo({...nuevo, stock: e.target.value})} required />
              </div>
              <button type="submit" className="btn btn-primary w-100 mt-2">Crear Producto</button>
            </form>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card p-3 shadow-sm">
            <h4>Inventario Actual</h4>
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {productos.map(p => (
                  <tr key={p.id}>
                    <td>{p.nombre}</td>
                    <td>${p.precio.toLocaleString()}</td>
                    <td>
                      <span className={`badge ${p.stock <= 3 ? 'bg-danger' : 'bg-success'}`}>
                        {p.stock} un.
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(p.id)}>
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