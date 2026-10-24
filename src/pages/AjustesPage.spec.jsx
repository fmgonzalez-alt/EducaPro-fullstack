import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AjustesPage } from './AjustesPage';

const userMock = {
  nombre: 'Juan Perez',
  rut: '12345678-9',
  email: 'juan@test.com',
  telefono: '912345678',
};

const KEY = `last_profile_update_${userMock.email}`;
const FECHA_ANTIGUA = '2020-01-01T00:00:00.000Z';

const habilitarEdicion = () => localStorage.setItem(KEY, FECHA_ANTIGUA);
const bloquearEdicion = () => localStorage.setItem(KEY, new Date().toISOString());

describe('AjustesPage', () => {
  beforeEach(() => localStorage.clear());

  it('muestra acceso restringido y abre el login si no hay sesión', async () => {
    const user = userEvent.setup();
    const onOpenLogin = jasmine.createSpy('onOpenLogin');
    render(<AjustesPage user={null} isLoggedIn={false} onOpenLogin={onOpenLogin} />);

    expect(screen.getByRole('heading', { name: /acceso restringido/i })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }));
    expect(onOpenLogin).toHaveBeenCalledTimes(1);
  });

  it('muestra acceso restringido si hay sesión pero el usuario es null', () => {
    render(<AjustesPage user={null} isLoggedIn={true} />);
    expect(screen.getByRole('heading', { name: /acceso restringido/i })).toBeInTheDocument();
  });

  it('muestra los datos del usuario cuando hay sesión', () => {
    render(<AjustesPage user={userMock} isLoggedIn={true} />);
    expect(screen.getByRole('heading', { name: /ajustes de usuario y pagos/i })).toBeInTheDocument();
    expect(screen.getByDisplayValue('Juan Perez')).toBeInTheDocument();
    expect(screen.getByDisplayValue('juan@test.com')).toBeDisabled();
  });

  it('usa valores por defecto cuando faltan email, rut y teléfono', () => {
    render(<AjustesPage user={{ nombre: 'Ana' }} isLoggedIn={true} />);
    expect(screen.getByDisplayValue('usuario@educapro.cl')).toBeInTheDocument();
    expect(screen.getByDisplayValue('19.876.543-2')).toBeInTheDocument();
    expect(screen.getByDisplayValue('+56 9 1234 5678')).toBeInTheDocument();
  });

  it('habilita la edición si pasaron más de 30 días', () => {
    habilitarEdicion();
    render(<AjustesPage user={userMock} isLoggedIn={true} />);
    expect(screen.getByText(/edición habilitada/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /guardar cambios/i })).toBeEnabled();
  });

  it('bloquea la edición si se modificó hace menos de 30 días', () => {
    bloquearEdicion();
    render(<AjustesPage user={userMock} isLoggedIn={true} />);
    expect(screen.getByText(/edición bloqueada temporalmente/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /bloqueado/i })).toBeDisabled();
    expect(screen.getByDisplayValue('Juan Perez')).toBeDisabled();
  });

  it('guarda los cambios y llama a onUpdateUser con los datos nuevos', async () => {
    const user = userEvent.setup();
    const onUpdateUser = jasmine.createSpy('onUpdateUser');
    habilitarEdicion();
    render(<AjustesPage user={userMock} isLoggedIn={true} onUpdateUser={onUpdateUser} />);

    const nombre = screen.getByDisplayValue('Juan Perez');
    await user.clear(nombre);
    await user.type(nombre, 'Maria Lopez');

    const telefono = screen.getByDisplayValue('912345678');
    await user.clear(telefono);
    await user.type(telefono, '911111111');

    await user.selectOptions(screen.getByRole('combobox'), 'Transferencia Bancaria');

    const tarjeta = screen.getByDisplayValue('**** **** **** 4589');
    await user.clear(tarjeta);
    await user.type(tarjeta, '9999');

    await user.click(screen.getByRole('button', { name: /guardar cambios/i }));

    expect(onUpdateUser).toHaveBeenCalledWith(
      jasmine.objectContaining({
        nombre: 'Maria Lopez',
        telefono: '911111111',
        metodoPago: 'Transferencia Bancaria',
        numeroTarjeta: '9999',
      })
    );
    expect(screen.getByRole('alert')).toHaveTextContent(/ajustes actualizados correctamente/i);
    expect(localStorage.getItem(KEY)).not.toBe(FECHA_ANTIGUA);
    expect(screen.getByRole('button', { name: /bloqueado/i })).toBeDisabled();
  });

  it('guarda sin errores aunque no se entregue onUpdateUser', async () => {
    const user = userEvent.setup();
    habilitarEdicion();
    render(<AjustesPage user={userMock} isLoggedIn={true} />);

    await user.click(screen.getByRole('button', { name: /guardar cambios/i }));
    expect(screen.getByRole('alert')).toHaveTextContent(/ajustes actualizados correctamente/i);
  });

  it('muestra error de restricción si se intenta guardar dentro de los 30 días', () => {
    const onUpdateUser = jasmine.createSpy('onUpdateUser');
    bloquearEdicion();
    render(<AjustesPage user={userMock} isLoggedIn={true} onUpdateUser={onUpdateUser} />);

    const form = screen.getByDisplayValue('Juan Perez').closest('form');
    fireEvent.submit(form);

    expect(screen.getByRole('alert')).toHaveTextContent(/restricción de seguridad/i);
    expect(onUpdateUser).not.toHaveBeenCalled();
  });

  it('usa la fecha por defecto cuando no hay fecha guardada', () => {
    render(<AjustesPage user={userMock} isLoggedIn={true} />);
    expect(screen.getByRole('heading', { name: /ajustes de usuario y pagos/i })).toBeInTheDocument();
  });
});