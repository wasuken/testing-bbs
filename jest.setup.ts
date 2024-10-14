import '@testing-library/jest-dom'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let mockConsoleLog: jest.SpyInstance

// eslint-disable-next-line @typescript-eslint/no-unused-vars
beforeAll(() => {
  mockConsoleLog = jest.spyOn(console, 'error').mockImplementation(() => {})
})
