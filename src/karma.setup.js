import * as JasmineDOMModulo from '@testing-library/jasmine-dom/dist/index.js';

const matchers =
  JasmineDOMModulo.default?.default ||
  JasmineDOMModulo.default ||
  JasmineDOMModulo;

beforeEach(() => {
  jasmine.addMatchers(matchers);
});