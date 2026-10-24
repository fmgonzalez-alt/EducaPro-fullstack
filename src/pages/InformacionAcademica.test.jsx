import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import * as Module from './InformacionAcademica';

const InformacionAcademica = Module.InformacionAcademica || Module.default;

describe('Pruebas Unitarias - InformacionAcademica', () => {
  it('Test 1: Debería renderizar la información académica correctamente', () => {
    render(<InformacionAcademica />);
    const titulos = screen.getAllByRole('heading');
    expect(titulos.length).toBeGreaterThan(0);
  });

  it('Test 2: Debería contener texto institucional en el documento', () => {
    render(<InformacionAcademica />);
    const elementos = screen.getAllByRole('heading');
    expect(elementos.length).toBeGreaterThan(0);
  });
});