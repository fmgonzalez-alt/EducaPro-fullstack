import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { CategoriasPage } from './CategoriasPage';

const renderPagina = ({ ruta = '/categorias', ...props } = {}) => {
  const onAddToCart = jasmine.createSpy('onAddToCart');
  const onOpenLogin = jasmine.createSpy('onOpenLogin');
  render(
    <MemoryRouter initialEntries={[ruta]}>
      <CategoriasPage
        isLoggedIn={true}
        onAddToCart={onAddToCart}
        onOpenLogin={onOpenLogin}
        {...props}
      />
    </MemoryRouter>
  );
  return { onAddToCart, onOpenLogin };
};

describe('CategoriasPage - sin sesión', () => {
  it('muestra la pantalla de bloqueo y no muestra cursos', () => {
    renderPagina({ isLoggedIn: false });
    expect(screen.getByRole('heading', { name: /aún no has iniciado sesión/i })).toBeInTheDocument();
    expect(screen.queryByText(/fundamentos de programación/i)).not.toBeInTheDocument();
  });

  it('llama a onOpenLogin al hacer clic en el botón', async () => {
    const user = userEvent.setup();
    const { onOpenLogin } = renderPagina({ isLoggedIn: false });
    await user.click(screen.getByRole('button', { name: /ir a iniciar sesión/i }));
    expect(onOpenLogin).toHaveBeenCalledTimes(1);
  });

  it('cambia el estilo del botón al pasar el mouse y lo restaura al salir', async () => {
    const user = userEvent.setup();
    renderPagina({ isLoggedIn: false });
    const boton = screen.getByRole('button', { name: /ir a iniciar sesión/i });

    expect(boton.style.transform).toBe('scale(1)');

    await user.hover(boton);
    expect(boton.style.transform).toBe('scale(1.08)');

    await user.unhover(boton);
    expect(boton.style.transform).toBe('scale(1)');
  });
});

describe('CategoriasPage - con sesión', () => {
  it('muestra la categoría Tecnología por defecto cuando no hay parámetro', () => {
    renderPagina();
    expect(screen.getByRole('heading', { name: /categoría: tecnología/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /fundamentos de programación/i })).toBeInTheDocument();
    expect(screen.getByText(/1 curso\(s\) disponible\(s\)/i)).toBeInTheDocument();
  });

  [
    ['Tecnología', 'Fundamentos de Programación'],
    ['Diseño', 'Diseño Gráfico Digital'],
    ['Marketing', 'Marketing Digital'],
    ['Oficios Técnicos', 'Electrónica Básica'],
    ['Administración', 'Gestión de Proyectos'],
  ].forEach(([area, curso]) => {
    it(`muestra el curso correcto para el área ${area}`, () => {
      renderPagina({ ruta: `/categorias?area=${encodeURIComponent(area)}` });
      expect(screen.getByRole('heading', { name: new RegExp(curso, 'i') })).toBeInTheDocument();
    });
  });

  it('filtra ignorando tildes y mayúsculas en el parámetro', () => {
    renderPagina({ ruta: '/categorias?area=diseno' });
    expect(screen.getByRole('heading', { name: /diseño gráfico digital/i })).toBeInTheDocument();
  });

  it('muestra 0 cursos si el área no existe', () => {
    renderPagina({ ruta: '/categorias?area=Inexistente' });
    expect(screen.getByText(/0 curso\(s\) disponible\(s\)/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /^matricular$/i })).not.toBeInTheDocument();
  });

  it('muestra el detalle del curso: precio, profesor y métodos de pago', () => {
    renderPagina();
    expect(screen.getByText(/250\.000 clp/i)).toBeInTheDocument();
    expect(screen.getByText(/juan lópez/i)).toBeInTheDocument();
    expect(screen.getByText(/efectivo, débito, crédito/i)).toBeInTheDocument();
  });
});

describe('CategoriasPage - modal de pago', () => {
  it('el modal no se ve hasta presionar Matricular', () => {
    renderPagina();
    expect(screen.queryByRole('heading', { name: /pago de matrícula/i })).not.toBeInTheDocument();
  });

  it('abre el modal al presionar Matricular', async () => {
    const user = userEvent.setup();
    renderPagina();
    await user.click(screen.getByRole('button', { name: /^matricular$/i }));
    expect(screen.getByRole('heading', { name: /pago de matrícula/i })).toBeInTheDocument();
  });

  it('cierra el modal al presionar Cancelar', async () => {
    const user = userEvent.setup();
    renderPagina();
    await user.click(screen.getByRole('button', { name: /^matricular$/i }));
    await user.click(screen.getByRole('button', { name: /cancelar/i }));
    expect(screen.queryByRole('heading', { name: /pago de matrícula/i })).not.toBeInTheDocument();
  });

  it('completa el pago, llama a onAddToCart con el curso y cierra el modal', async () => {
    const user = userEvent.setup();
    const { onAddToCart } = renderPagina();

    await user.click(screen.getByRole('button', { name: /^matricular$/i }));
    await user.type(screen.getByPlaceholderText('1234 5678 9012 3456'), '1234567890123456');
    await user.type(screen.getByPlaceholderText('12/28'), '12/28');
    await user.type(screen.getByPlaceholderText('123'), '123');
    await user.click(screen.getByRole('button', { name: /pagar matrícula/i }));

    expect(onAddToCart).toHaveBeenCalledWith(jasmine.objectContaining({ id: 'CRS001' }));
    expect(screen.queryByRole('heading', { name: /pago de matrícula/i })).not.toBeInTheDocument();
  });
});