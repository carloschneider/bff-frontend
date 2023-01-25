import '@testing-library/jest-dom/extend-expect'
import Schema from 'async-validator'
import { enableFetchMocks } from 'jest-fetch-mock'

enableFetchMocks()

Schema.warning = function () {
  return void 0
}

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn()
    }
  }
