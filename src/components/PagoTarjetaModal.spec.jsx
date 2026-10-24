import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { PagoTarjetaModal } from './PagoTarjetaModal';

const curso = { id: 1, nombre: 'Curso React', profesor: 'Ana', precio: 25000 };

const renderModal = (props = {}) => {
  const onClose = jasmine.createSpy('onClose');
  const onPagoExitoso = jasmine.createSpy('onPagoExitoso');
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route
          path="/"
          element={
            <PagoTarjetaModal
              isOpen={true}
              curso={curso}
              onClose={onClose}
              onPagoExitoso={onPagoExitoso}
              {...props}
            />
          }
        />
        <Route path="/pago-exitoso" element={<p>Página de pago exitoso</p>} />
      </Routes>
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
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Página de pago exitoso')).toBeInTheDocument();
  });

  it('llama a onClose al presionar Cancelar', async () => {
    const user = userEvent.setup();
    const { onClose } = renderModal();
    await user.click(screen.getByRole('button', { name: /cancelar/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});