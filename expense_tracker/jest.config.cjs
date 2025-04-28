module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: [
    '@testing-library/jest-dom',
    './src/setupTests.js'  // Path to your setupTests.js file
  ],
  moduleFileExtensions: ['js', 'jsx'],
};
