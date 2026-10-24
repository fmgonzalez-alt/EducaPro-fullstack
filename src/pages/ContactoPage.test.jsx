import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import * as Module from './ContactoPage';

const ContactoPage = Module.ContactoPage || Module.default;

describe('Pruebas Unitarias - ContactoPage', () => {
  it('Test 3: Debería renderizar la página de contacto con su título', () => {
    render(<ContactoPage />);
    const titulos = screen.getAllByRole('heading');
    expect(titulos.length).toBeGreaterThan(0);
  });

  it('Test 4: Debería renderizar los elementos de la vista de contacto', () => {
    render(<ContactoPage />);
    const encabezados = screen.getAllByRole('heading');
    expect(encabezados.length).toBeGreaterThan(0);
  });
});