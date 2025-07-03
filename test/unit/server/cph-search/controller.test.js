import { describe, it, expect, vi, beforeEach } from 'vitest'
import { cphSearchController } from '../../../../src/server/cph-search/controller.js'
import { ApiClient } from '../../../../src/server/common/helpers/api-client.js'

// Mock the API client
vi.mock('../../../../src/server/common/helpers/api-client.js', () => ({
  ApiClient: {
    getHoldingByCph: vi.fn()
  }
}))

describe('CPH Search Controller', () => {
  let mockRequest
  let mockH

  beforeEach(() => {
    mockRequest = {
      query: {},
      logger: {
        error: vi.fn()
      }
    }
    mockH = {
      view: vi.fn().mockReturnValue('mocked view response')
    }
    vi.clearAllMocks()
  })

  describe('handler', () => {
    it('should render empty search page when no CPH provided', async () => {
      const result = await cphSearchController.handler(mockRequest, mockH)

      expect(mockH.view).toHaveBeenCalledWith('cph-search/index', {
        pageTitle: 'Search for Holding',
        heading: 'Search for Holding',
        breadcrumbs: [
          {
            text: 'Home',
            href: '/'
          },
          {
            text: 'Search for Holding'
          }
        ],
        cph: undefined,
        holding: null,
        errorMessage: null
      })
      expect(result).toBe('mocked view response')
    })

    it('should search for holding when valid CPH provided', async () => {
      const mockHolding = {
        cph: '12/123/1234',
        name: 'Test Farm',
        address: 'Test Address'
      }
      ApiClient.getHoldingByCph.mockResolvedValue(mockHolding)
      mockRequest.query = { cph: '12/123/1234' }

      const result = await cphSearchController.handler(mockRequest, mockH)

      expect(ApiClient.getHoldingByCph).toHaveBeenCalledWith('12/123/1234')
      expect(mockH.view).toHaveBeenCalledWith('cph-search/index', {
        pageTitle: 'Search for Holding',
        heading: 'Search for Holding',
        breadcrumbs: [
          {
            text: 'Home',
            href: '/'
          },
          {
            text: 'Search for Holding'
          }
        ],
        cph: '12/123/1234',
        holding: mockHolding,
        errorMessage: null
      })
      expect(result).toBe('mocked view response')
    })

    it('should handle 404 error when holding not found', async () => {
      const notFoundError = new Error('404 Not Found')
      ApiClient.getHoldingByCph.mockRejectedValue(notFoundError)
      mockRequest.query = { cph: '99/999/9999' }

      const result = await cphSearchController.handler(mockRequest, mockH)

      expect(ApiClient.getHoldingByCph).toHaveBeenCalledWith('99/999/9999')
      expect(mockH.view).toHaveBeenCalledWith('cph-search/index', {
        pageTitle: 'Search for Holding',
        heading: 'Search for Holding',
        breadcrumbs: [
          {
            text: 'Home',
            href: '/'
          },
          {
            text: 'Search for Holding'
          }
        ],
        cph: '99/999/9999',
        holding: null,
        errorMessage: 'No holding found with CPH number 99/999/9999'
      })
      expect(result).toBe('mocked view response')
    })

    it('should handle API errors gracefully', async () => {
      const apiError = new Error('Internal Server Error')
      ApiClient.getHoldingByCph.mockRejectedValue(apiError)
      mockRequest.query = { cph: '12/123/1234' }

      const result = await cphSearchController.handler(mockRequest, mockH)

      expect(ApiClient.getHoldingByCph).toHaveBeenCalledWith('12/123/1234')
      expect(mockH.view).toHaveBeenCalledWith('cph-search/index', {
        pageTitle: 'Search for Holding',
        heading: 'Search for Holding',
        breadcrumbs: [
          {
            text: 'Home',
            href: '/'
          },
          {
            text: 'Search for Holding'
          }
        ],
        cph: '12/123/1234',
        holding: null,
        errorMessage: 'An error occurred while searching for the holding. Please try again.'
      })
      expect(result).toBe('mocked view response')
    })

    it('should handle unexpected errors', async () => {
      const unexpectedError = new Error('Unexpected error')
      mockH.view.mockImplementationOnce(() => {
        throw unexpectedError
      }).mockReturnValueOnce('mocked error view response')
      mockRequest.query = { cph: '12/123/1234' }

      const result = await cphSearchController.handler(mockRequest, mockH)

      expect(mockRequest.logger.error).toHaveBeenCalledWith('Error in CPH search controller:', unexpectedError)
      expect(result).toBe('mocked error view response')
    })
  })
})
