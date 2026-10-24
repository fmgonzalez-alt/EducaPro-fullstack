import { render, screen } from '@testing-library/react';
import { InformacionAcademica } from './InformacionAcademica';

describe('InformacionAcademica', () => {
  beforeEach(() => {
    render(<InformacionAcademica />);
  });

  it('muestra el título principal de la institución', () => {
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /educapro — instituto de formación técnica y profesional/i,
      })
    ).toBeInTheDocument();
  });

  it('muestra los datos de presentación: año de fundación, sedes y áreas', () => {
    expect(screen.getByText('2010')).toBeInTheDocument();
    expect(
      screen.getByText('Tecnología, Administración, Diseño y Oficios Técnicos')
    ).toBeInTheDocument();
    expect(screen.getByText('Presentación Institucional')).toBeInTheDocument();
  });

  it('muestra las cuatro métricas clave con su valor', () => {
    expect(screen.getByRole('heading', { name: '80' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '3.200' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '25' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '3 Sedes' })).toBeInTheDocument();
  });

  it('muestra la descripción de cada métrica', () => {
    expect(screen.getByText('Cursos impartidos al año')).toBeInTheDocument();
    expect(screen.getByText('Estudiantes matriculados')).toBeInTheDocument();
    expect(screen.getByText('Profesores en el cuerpo docente')).toBeInTheDocument();
    expect(screen.getByText('Santiago, Valparaíso, Concepción')).toBeInTheDocument();
  });

  it('muestra el diagnóstico operativo con el crecimiento de demanda', () => {
    expect(
      screen.getByRole('heading', { name: /desafío institucional y transformación digital/i })
    ).toBeInTheDocument();
    expect(screen.getByText('Crecimiento del +45% en Demanda')).toBeInTheDocument();
    expect(screen.getByText('45%')).toBeInTheDocument();
  });

  it('muestra el objetivo del portal digital', () => {
    expect(
      screen.getByText(/objetivo de la implementación del portal digital educapro/i)
    ).toBeInTheDocument();
  });

  it('muestra la sección de estructura organizacional con 4 miembros', () => {
    expect(
      screen.getByRole('heading', { name: /roles de gestión y administración/i })
    ).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 4 }).length).toBe(4);
    expect(screen.getAllByRole('heading').length).toBe(11);
  });

  it('muestra cargo, titular y cantidad de cada miembro del equipo', () => {
    expect(screen.getByText('Director Académico')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Dr. Roberto Morales V.' })).toBeInTheDocument();
    expect(screen.getByText('1 Director')).toBeInTheDocument();

    expect(screen.getByText('Administrador General')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Dra. Patricia Silva A.' })).toBeInTheDocument();
    expect(screen.getByText('1 Administrador')).toBeInTheDocument();

    expect(screen.getByText('Coordinadores Académicos')).toBeInTheDocument();
    expect(screen.getByText('5 Coordinadores')).toBeInTheDocument();

    expect(screen.getByText('Administrativos')).toBeInTheDocument();
    expect(screen.getByText('3 Administrativos')).toBeInTheDocument();
  });

  it('muestra responsabilidades y flujo actual en cada tarjeta', () => {
    expect(screen.getAllByText(/responsabilidades principales/i).length).toBe(4);
    expect(screen.getAllByText(/flujo actual de información/i).length).toBe(4);
    expect(
      screen.getByText(/planillas excel para gestionar la programación de clases/i)
    ).toBeInTheDocument();
  });

  it('usa texto oscuro en el badge claro de coordinadores y blanco en los demás', () => {
    const badgeCoordinadores = screen.getByText('Coordinadores Académicos');
    const badgeDirector = screen.getByText('Director Académico');
    expect(badgeCoordinadores.style.color).toBe('rgb(68, 52, 52)');
    expect(badgeDirector.style.color).toBe('rgb(255, 255, 255)');
  });
});