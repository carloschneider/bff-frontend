import '@testing-library/jest-dom/extend-expect'
import Schema from 'async-validator'
import { enableFetchMocks } from 'jest-fetch-mock'

enableFetchMocks()

Schema.warning = function () {
  return void 0
}

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
})
