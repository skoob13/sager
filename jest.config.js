module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js}',
  ],
  setupFiles: [],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js}',
    '<rootDir>/src/**/?(*.)(spec|test).{js}',
  ],
  testEnvironment: 'node',
  transform: {
    '^.+\\.(js)$': '<rootDir>/node_modules/babel-jest',
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js)$',
  ],
  moduleFileExtensions: ['js'],
};
