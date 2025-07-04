import { describe, it, expect, vi, beforeEach } from 'vitest'
import { cphSearchController } from '~/src/server/cph-search/controller.js'
import { ApiClient } from '~/src/server/common/helpers/api-client.js'

// Mock the API client
vi.mock('~/src/server/common/helpers/api-client.js', () => ({
  ApiClient: {
    getHoldingByCph: vi.fn()
  }
}))

describe('CPH Search Controller', () => {
  let mockRequest
  let mockH

  beforeEach(() => {
    vi.clearAllMocks()
    mockRequest = {
      query: {},
      logger: {
        error: vi.fn()
      }
    }
    mockH = {
      view: vi.fn()
    }
  })

  describe('handler', () => {
    it('should render the search page without results when no CPH is provided', async () => {
      await cphSearchController.handler(mockRequest, mockH)

      expect(mockH.view).toHaveBeenCalledWith('cph-search/index', {
        pageTitle: 'Search for Holding',
        heading: 'Search for Holding',
        breadcrumbs: [
          { text: 'Search for Holding' }
        ],
        cph: undefined,
        holding: null,
        errorMessage: null
      })
    })

    it('should search for holding with valid CPH and return results', async () => {
      const mockHolding = {
        data: {
          holding: {
            _id: 'test-id',
            details: {
              cph: '12/123/1234',
              name: 'Test Farm',
              description: 'Test description',
              address: {
                street: 'Test Street',
                town: 'Test Town',
                county: 'Test County',
                postcode: 'TE1 1ST'
              }
            }
          }
        }
      }

      mockRequest.query = { cph: '12/123/1234' }
      ApiClient.getHoldingByCph.mockResolvedValue(mockHolding)

      await cphSearchController.handler(mockRequest, mockH)

      expect(ApiClient.getHoldingByCph).toHaveBeenCalledWith('12/123/1234')
      expect(mockH.view).toHaveBeenCalledWith('cph-search/index', {
        pageTitle: 'Search for Holding',
        heading: 'Search for Holding',
        breadcrumbs: [
          { text: 'Search for Holding' }
        ],
        cph: '12/123/1234',
        holding: mockHolding,
        errorMessage: null
      })
    })

    it('should handle 404 error when holding is not found', async () => {
      mockRequest.query = { cph: '12/123/1234' }
      ApiClient.getHoldingByCph.mockRejectedValue(new Error('API request failed: 404 Not Found'))

      await cphSearchController.handler(mockRequest, mockH)

      expect(mockH.view).toHaveBeenCalledWith('cph-search/index', {
        pageTitle: 'Search for Holding',
        heading: 'Search for Holding',
        breadcrumbs: [
          { text: 'Search for Holding' }
        ],
        cph: '12/123/1234',
        holding: null,
        errorMessage: 'No holding found with CPH number 12/123/1234'
      })
    })

    it('should handle general API errors', async () => {
      mockRequest.query = { cph: '12/123/1234' }
      ApiClient.getHoldingByCph.mockRejectedValue(new Error('Network error'))

      await cphSearchController.handler(mockRequest, mockH)

      expect(mockH.view).toHaveBeenCalledWith('cph-search/index', {
        pageTitle: 'Search for Holding',
        heading: 'Search for Holding',
        breadcrumbs: [
          { text: 'Search for Holding' }
        ],
        cph: '12/123/1234',
        holding: null,
        errorMessage: 'An error occurred while searching for the holding. Please try again.'
      })
    })

    it('should handle unexpected errors gracefully', async () => {
      mockRequest.query = { cph: '12/123/1234' }
      ApiClient.getHoldingByCph.mockImplementation(() => {
        throw new Error('Unexpected error')
      })

      await cphSearchController.handler(mockRequest, mockH)

      expect(mockRequest.logger.error).toHaveBeenCalledWith('Error in CPH search controller:', expect.any(Error))
      expect(mockH.view).toHaveBeenCalledWith('cph-search/index', {
        pageTitle: 'Search for Holding',
        heading: 'Search for Holding',
        breadcrumbs: [
          { text: 'Search for Holding' }
        ],
        errorMessage: 'An unexpected error occurred. Please try again.'
      })
    })
  })
})
