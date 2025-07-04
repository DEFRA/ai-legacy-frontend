import { vi, describe, beforeAll, beforeEach, test, expect } from 'vitest'

const mockReadFileSync = vi.fn()
const mockLoggerError = vi.fn()

vi.mock('node:fs', async () => {
  const actual = await vi.importActual('node:fs')
  return {
    ...actual,
    readFileSync: mockReadFileSync
  }
})

vi.mock('../../../../../src/server/common/helpers/logging/logger.js', () => ({
  createLogger: () => ({ error: mockLoggerError })
}))

describe('#context', () => {
  const mockRequest = { path: '/' }
  let contextResult

  describe('When webpack manifest file read succeeds', () => {
    let contextImport

    beforeAll(async () => {
      // Clear any existing module cache
      vi.resetModules()
      contextImport = await import('../../../../../src/config/nunjucks/context/context.js')
    })

    beforeEach(() => {
      vi.clearAllMocks()
      // Return JSON string
      mockReadFileSync.mockReturnValue(`{
        "application.js": "javascripts/application.js",
        "stylesheets/application.scss": "stylesheets/application.css"
      }`)

      contextResult = contextImport.context(mockRequest)
    })

    test('Should provide expected context', () => {
      expect(contextResult).toEqual({
        assetPath: '/public/assets',
        breadcrumbs: [],
        getAssetPath: expect.any(Function),
        navigation: [
          {
            current: true,
            text: 'Home',
            href: '/'
          },
          {
            current: false,
            text: 'About',
            href: '/about'
          }
        ],
        serviceName: 'ai-legacy-frontend',
        serviceUrl: '/'
      })
    })

    describe('With valid asset path', () => {
      test('Should provide expected asset path', () => {
        expect(contextResult.getAssetPath('application.js')).toBe(
          '/public/javascripts/application.js'
        )
      })
    })

    describe('With invalid asset path', () => {
      test('Should provide expected asset', () => {
        expect(contextResult.getAssetPath('an-image.png')).toBe(
          '/public/an-image.png'
        )
      })
    })
  })

  describe('When webpack manifest file read fails', () => {
    let contextImport

    beforeAll(async () => {
      // Clear any existing module cache
      vi.resetModules()
      contextImport = await import('../../../../../src/config/nunjucks/context/context.js')
    })

    beforeEach(() => {
      vi.clearAllMocks()
      mockReadFileSync.mockImplementation(() => {
        throw new Error('File not found')
      })

      contextResult = contextImport.context(mockRequest)
    })

    test('Should log that the Webpack Manifest file is not available', () => {
      expect(mockLoggerError).toHaveBeenCalledWith(
        'Webpack assets-manifest.json not found'
      )
    })
  })
})

describe('#context cache', () => {
  const mockRequest = { path: '/' }
  let contextResult

  describe('Webpack manifest file cache', () => {
    let contextImport

    beforeAll(async () => {
      // Clear any existing module cache
      vi.resetModules()
      contextImport = await import('../../../../../src/config/nunjucks/context/context.js')
    })

    beforeEach(() => {
      vi.clearAllMocks()
      // Return JSON string
      mockReadFileSync.mockReturnValue(`{
        "application.js": "javascripts/application.js",
        "stylesheets/application.scss": "stylesheets/application.css"
      }`)
    })

    test('Should read file', () => {
      contextResult = contextImport.context(mockRequest)
      expect(mockReadFileSync).toHaveBeenCalled()
    })

    test('Should use cache', () => {
      // Call again to test caching
      contextResult = contextImport.context(mockRequest)
      expect(mockReadFileSync).not.toHaveBeenCalled()
    })

    test('Should provide expected context', () => {
      expect(contextResult).toEqual({
        assetPath: '/public/assets',
        breadcrumbs: [],
        getAssetPath: expect.any(Function),
        navigation: [
          {
            current: true,
            text: 'Home',
            href: '/'
          },
          {
            current: false,
            text: 'About',
            href: '/about'
          }
        ],
        serviceName: 'ai-legacy-frontend',
        serviceUrl: '/'
      })
    })
  })
})
