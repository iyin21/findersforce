import '@testing-library/jest-dom'
import { server } from '../src/mocks/server'

// Establish API mocking before all tests.
beforeAll(() => {
    server.listen({
        onUnhandledRequest(req) {
            console.error(
                `Unhandled request: ${req.method} ${
                    req.url.href
                }, ${JSON.stringify(req.url.host, null, 2)}`
            )
            throw new Error(`'Unhandled request`)
        },
    })
})

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers())

// Clean up after the tests are finished.
afterAll(() => server.close())
