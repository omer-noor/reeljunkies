module.exports = {
    // other configuration options
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
      '^.+\\.svg$': '<rootDir>/svgTransform.js',
    },
    moduleNameMapper: {
      '\\.(css|less)$': '<rootDir>/mocks/styleMock.js',
    },
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['./jest.setup.js'], 
  };
  