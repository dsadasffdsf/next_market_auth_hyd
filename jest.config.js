module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  rootDir: 'src', // Указываем src как корневую директорию
  moduleNameMapper: {
    '^@redux/(.*)$': '<rootDir>/src/redux/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@interfaces/(.*)$': '<rootDir>/src/interfaces/$1',
    '^@data/(.*)$': '<rootDir>/src/data/$1',
    '^@configs/(.*)$': '<rootDir>/src/configs/$1',
    '^@controllers/(.*)$': '<rootDir>/src/controllers/$1',
  },
};
