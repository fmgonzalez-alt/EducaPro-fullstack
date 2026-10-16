export const productosIniciales = [
  { 
    id: 1, 
    nombre: 'Cuaderno Universitario 100 Hojas Matte', 
    precio: 2490, 
    categoria: 'Librería', 
    stock: 25, 
    oferta: true, 
    imagen: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=500&auto=format&fit=crop' 
  },
  { 
    id: 2, 
    nombre: 'Block de Dibujo y Témperas Escolar', 
    precio: 3990, 
    categoria: 'Librería', 
    stock: 18, 
    oferta: false, 
    imagen: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=500&auto=format&fit=crop' 
  },
  { 
    id: 3, 
    nombre: 'Set Geométrico Completo con Compás', 
    precio: 2990, 
    categoria: 'Librería', 
    stock: 12, 
    oferta: true, 
    imagen: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=500&auto=format&fit=crop' 
  },
  { 
    id: 4, 
    nombre: 'Set Lápices de Colores y Sacapuntas', 
    precio: 4990, 
    categoria: 'Librería', 
    stock: 15, 
    oferta: true, 
    imagen: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=500&auto=format&fit=crop' 
  },
  { 
    id: 5, 
    nombre: 'Mochila Ergonómica Porta Notebook 15"', 
    precio: 29990, 
    categoria: 'Accesorios', 
    stock: 8, 
    oferta: false, 
    imagen: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=500&auto=format&fit=crop' 
  },
  { 
    id: 6, 
    nombre: 'Calculadora Científica Avanzada', 
    precio: 18990, 
    categoria: 'Tecnología', 
    stock: 2, 
    oferta: true, 
    imagen: 'https://casaroyalaws.s3.us-east-1.amazonaws.com/110511_2ip.jpg' 
  },
  { 
    id: 7, 
    nombre: 'Pack Lapiceras Tinta Gel x10 Colores', 
    precio: 3990, 
    categoria: 'Librería', 
    stock: 3, 
    oferta: false, 
    imagen: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=500&auto=format&fit=crop' 
  },
  { 
    id: 8, 
    nombre: 'Estuche Multifuncional Dos Compartimientos', 
    precio: 5990, 
    categoria: 'Accesorios', 
    stock: 10, 
    oferta: true, 
    imagen: 'https://media.falabella.com/falabellaCL/119425313_01/w=1500,h=1500,fit=cover' 
  }
];

export const getProductos = () => {
  const data = localStorage.getItem('mi_tienda_online_estudiante_db');
  return data ? JSON.parse(data) : productosIniciales;
};

export const saveProductos = (productos) => {
  localStorage.setItem('mi_tienda_online_estudiante_db', JSON.stringify(productos));
};

export const addProducto = (nuevoProducto) => {
  const productos = getProductos();
  const productoConId = { ...nuevoProducto, id: Date.now() };
  const actualizados = [...productos, productoConId];
  saveProductos(actualizados);
  return actualizados;
};

export const deleteProducto = (id) => {
  const productos = getProductos();
  const actualizados = productos.filter(p => p.id !== id);
  saveProductos(actualizados);
  return actualizados;
};