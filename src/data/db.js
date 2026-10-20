// Catálogo Inicial de Cursos EducaPro
export const cursosIniciales = [
  {
    id: 'CRS001',
    codigo: 'CRS001',
    nombre: 'Fundamentos de Programación',
    area: 'Tecnología',
    duracion: 40,
    precio: 250000,
    capacidadMax: 25,
    profesor: 'Juan López',
    estado: 'En curso',
    descripcion: 'El curso está en progreso. Puedes revisar calificaciones y asistencia.',
    imagen: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 'CRS002',
    codigo: 'CRS002',
    nombre: 'Diseño Gráfico Digital',
    area: 'Diseño',
    duracion: 35,
    precio: 220000,
    capacidadMax: 20,
    profesor: 'María González',
    estado: 'Matriculado',
    descripcion: 'Has sido matriculado en el curso. Revisa los detalles académicos.',
    imagen: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 'CRS003',
    codigo: 'CRS003',
    nombre: 'Marketing Digital',
    area: 'Marketing',
    duracion: 30,
    precio: 200000,
    capacidadMax: 25,
    profesor: 'Carlos Soto',
    estado: 'En curso',
    descripcion: 'El curso está en progreso. Consulta las evaluaciones en línea.',
    imagen: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 'CRS004',
    codigo: 'CRS004',
    nombre: 'Electrónica Básica',
    area: 'Oficios Técnicos',
    duracion: 45,
    precio: 280000,
    capacidadMax: 15,
    profesor: 'Luis Pérez',
    estado: 'Reprobado',
    descripcion: 'No has aprobado el curso. Ver detalles para solicitar recuperación.',
    imagen: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 'CRS005',
    codigo: 'CRS005',
    nombre: 'Gestión de Proyectos',
    area: 'Administración',
    duracion: 35,
    precio: 230000,
    capacidadMax: 20,
    profesor: 'Ana Rodríguez',
    estado: 'Certificado',
    descripcion: 'Has obtenido tu certificado. Puedes descargarlo en línea.',
    imagen: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=500&auto=format&fit=crop'
  }
];

// Estados académicos oficiales de EducaPro
export const estadosAcademicos = [
  { codigo: 'EST001', estado: 'Matriculado', desc: 'El estudiante está inscrito en el curso.' },
  { codigo: 'EST002', estado: 'En curso', desc: 'El estudiante está cursando el curso.' },
  { codigo: 'EST003', estado: 'Aprobado', desc: 'El estudiante ha aprobado el curso.' },
  { codigo: 'EST004', estado: 'Reprobado', desc: 'El estudiante ha reprobado el curso.' },
  { codigo: 'EST005', estado: 'Certificado', desc: 'El estudiante ha obtenido su certificado.' }
];

export const getProductos = () => {
  const data = localStorage.getItem('educapro_cursos_db');
  return data ? JSON.parse(data) : cursosIniciales;
};

export const saveProductos = (cursos) => {
  localStorage.setItem('educapro_cursos_db', JSON.stringify(cursos));
};

export const addProducto = (nuevoCurso) => {
  const cursos = getProductos();
  const cursoConId = { 
    ...nuevoCurso, 
    id: `CRS00${cursos.length + 1}`,
    codigo: `CRS00${cursos.length + 1}`
  };
  const actualizados = [...cursos, cursoConId];
  saveProductos(actualizados);
  return actualizados;
};

export const deleteProducto = (id) => {
  const cursos = getProductos();
  const actualizados = cursos.filter(c => c.id !== id);
  saveProductos(actualizados);
  return actualizados;
};