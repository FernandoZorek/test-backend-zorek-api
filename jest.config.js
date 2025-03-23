module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts$': ['ts-jest', { isolatedModules: true }],
  },
  testMatch: ['**/tests/**/*.test.ts', '**/services/**/*.spec.ts'],
  verbose: true,
};