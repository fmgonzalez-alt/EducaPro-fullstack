const path = require('path');

const babelOptions = (conCobertura) => ({
  presets: [
    ['@babel/preset-env', { targets: { chrome: '100' } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
  plugins: conCobertura ? ['istanbul'] : [],
});

const ARCHIVOS_DE_PRUEBA = /(\.spec\.jsx?|karma\.setup\.js)$/;

module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', 'webpack'],
    plugins: [
      'karma-jasmine',
      'karma-webpack',
      'karma-chrome-launcher',
      'karma-coverage',
      'karma-spec-reporter',
    ],
    files: [
      { pattern: 'src/karma.setup.js', watched: false },
      { pattern: 'src/**/*.spec.jsx', watched: false },
    ],
    preprocessors: {
      'src/karma.setup.js': ['webpack'],
      'src/**/*.spec.jsx': ['webpack'],
    },
    webpack: {
      mode: 'development',
      devtool: false,
      resolve: { extensions: ['.js', '.jsx'] },
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            include: path.resolve(__dirname, 'src'),
            exclude: ARCHIVOS_DE_PRUEBA,
            use: { loader: 'babel-loader', options: babelOptions(true) },
          },
          {
            test: ARCHIVOS_DE_PRUEBA,
            include: path.resolve(__dirname, 'src'),
            use: { loader: 'babel-loader', options: babelOptions(false) },
          },
        ],
      },
    },
    reporters: ['spec', 'coverage'],
    coverageReporter: {
      dir: 'coverage-karma',
      reporters: [{ type: 'text' }, { type: 'html' }],
    },
    browsers: ['ChromeHeadless'],
    singleRun: true,
  });
};