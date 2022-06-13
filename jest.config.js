
require('dotenv').config({ path: '.env.test' });

module.exports = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  roots: ['<rootDir>/test'],
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  verbose: true,
  collectCoverageFrom: ['src/*.(t|j)s', '!src/index.ts', '!**/node_modules/**'],
  setupFilesAfterEnv: [
    '<rootDir>/test/unit/setup.ts'
  ],
  collectCoverage: true,
  coverageDirectory: './coverage',
  coverageReporters: ['text', 'json', 'json-summary', 'lcov', 'html'],
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './coverage',
        filename: 'report.html',
        expand: true,
      },
    ],
  ],
};