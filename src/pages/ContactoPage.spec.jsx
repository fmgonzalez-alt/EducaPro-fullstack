import { render, screen } from '@testing-library/react';
import { ContactoPage } from './ContactoPage';

describe('ContactoPage', () => {
  beforeEach(() => {
    render(<ContactoPage />);
  });

  it('muestra el título principal de la página', () => {
    expect(
      screen.getByRole('heading', { level: 1, name: /canales oficiales educapro/i })
    ).toBeInTheDocument();
  });

  it('muestra las tres tarjetas de contacto con su título', () => {
    expect(screen.getByRole('heading', { name: /correo electrónico/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /linkedin oficial/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /mesa central y sedes/i })).toBeInTheDocument();
    expect(screen.getAllByRole('heading').length).toBe(4);
  });

  it('muestra los correos de contacto y admisión', () => {
    expect(screen.getByText('contacto@educapro.cl')).toBeInTheDocument();
    expect(screen.getByText('admision@educapro.cl')).toBeInTheDocument();
  });

  it('muestra el enlace de LinkedIn con atributos seguros', () => {
    const enlace = screen.getByRole('link', { name: /linkedin\.com\/company\/educapro-cl/i });
    expect(enlace).toHaveAttribute('href', 'https://linkedin.com');
    expect(enlace).toHaveAttribute('target', '_blank');
    expect(enlace).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('muestra las sedes y el teléfono de la mesa central', () => {
    expect(screen.getByText(/santiago \| valparaíso \| concepción/i)).toBeInTheDocument();
    expect(screen.getByText(/\+56 2 2900 0000/)).toBeInTheDocument();
  });

  it('muestra el texto descriptivo de la página', () => {
    expect(
      screen.getByText(/medios oficiales de comunicación institucionales/i)
    ).toBeInTheDocument();
  });
});