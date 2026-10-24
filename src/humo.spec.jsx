import { render, screen } from '@testing-library/react';

describe('Configuración Karma + Jasmine', () => {
  it('renderiza un componente y usa los matchers de DOM', () => {
    render(<h1>Hola Karma</h1>);
    expect(screen.getByRole('heading', { name: 'Hola Karma' })).toBeInTheDocument();
  });
});