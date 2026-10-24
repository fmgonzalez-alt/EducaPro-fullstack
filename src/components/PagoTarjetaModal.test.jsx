import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { PagoTarjetaModal } from './PagoTarjetaModal';

const navigateMock = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useNavigate: () => navigateMock };
});

const curso = { id: 1, nombre: 'Curso React', profesor: 'Ana', precio: 25000 };

const renderModal = (props = {}) => {
  const onClose = vi.fn();
  const onPagoExitoso = vi.fn();
  render(
    <MemoryRouter>
      <PagoTarjetaModal
        isOpen={true}
        curso={curso}
        onClose={onClose}
        onPagoExitoso={onPagoExitoso}
        {...props}
      />
    </MemoryRouter>
  );
  return { onClose, onPagoExitoso };
};

const llenar = async (user, { tarjeta, fecha, cvv }) => {
  await user.type(screen.getByPlaceholderText('1234 5678 9012 3456'), tarjeta);
  await user.type(screen.getByPlaceholderText('12/28'), fecha);
  await user.type(screen.getByPlaceholderText('123'), cvv);
  await user.click(screen.getByRole('button', { name: /pagar matrícula/i }));
};

describe('PagoTarjetaModal', () => {
  beforeEach(() => navigateMock.mockClear());

  it('no renderiza nada si isOpen es false', () => {
    renderModal({ isOpen: false });
    expect(screen.queryByText(/pago de matrícula/i)).not.toBeInTheDocument();
  });

  it('no renderiza nada si no hay curso', () => {
    renderModal({ curso: null });
    expect(screen.queryByText(/pago de matrícula/i)).not.toBeInTheDocument();
  });

  it('muestra los datos del curso', () => {
    renderModal();
    expect(screen.getByText('Curso React')).toBeInTheDocument();
    expect(screen.getByText(/profesor: ana/i)).toBeInTheDocument();
  });

  it('muestra error si el número de tarjeta es inválido', async () => {
    const user = userEvent.setup();
    const { onPagoExitoso } = renderModal();
    await llenar(user, { tarjeta: '123', fecha: '12/28', cvv: '123' });
    expect(screen.getByText(/número de tarjeta válido/i)).toBeInTheDocument();
    expect(onPagoExitoso).not.toHaveBeenCalled();
  });

  it('muestra error si la fecha de vencimiento es inválida', async () => {
    const user = userEvent.setup();
    renderModal();
    await llenar(user, { tarjeta: '1234567890123456', fecha: '1228', cvv: '123' });
    expect(screen.getByText(/fecha de vencimiento válida/i)).toBeInTheDocument();
  });

  it('muestra error si el CVV es inválido', async () => {
    const user = userEvent.setup();
    renderModal();
    await llenar(user, { tarjeta: '1234567890123456', fecha: '12/28', cvv: '12' });
    expect(screen.getByText(/código cvv válido/i)).toBeInTheDocument();
  });

  it('con datos válidos llama a onPagoExitoso, onClose y navega', async () => {
    const user = userEvent.setup();
    const { onPagoExitoso, onClose } = renderModal();
    await llenar(user, { tarjeta: '1234 5678 9012 3456', fecha: '12/28', cvv: '123' });
    expect(onPagoExitoso).toHaveBeenCalledWith(curso);
    expect(onClose).toHaveBeenCalledOnce();
    expect(navigateMock).toHaveBeenCalledWith('/pago-exitoso');
  });

  it('llama a onClose al presionar Cancelar', async () => {
    const user = userEvent.setup();
    const { onClose } = renderModal();
    await user.click(screen.getByRole('button', { name: /cancelar/i }));
    expect(onClose).toHaveBeenCalledOnce();
  });
});