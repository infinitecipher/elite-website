// npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom ts-node @types/jest @testing-library/user-event

import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  coverageProvider: 'v8',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/app/globals.css',
  ],
  moduleNameMapper: {
    // Specific mock MUST come before the general @/ alias
    '^@/components/Globe$': '<rootDir>/__mocks__/Globe.js',
    // General path alias
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

export default createJestConfig(config)
