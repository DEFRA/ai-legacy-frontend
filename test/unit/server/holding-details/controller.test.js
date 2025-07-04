import { describe, it, expect, vi, beforeEach } from 'vitest'
import { holdingDetailsController } from '../../../../src/server/holding-details/controller.js'
import { ApiClient } from '../../../../src/server/common/helpers/api-client.js'

// Mock the API client
vi.mock('../../../../src/server/common/helpers/api-client.js', () => ({
  ApiClient: {
    getHoldingByCph: vi.fn()
  }
}))

describe('Holding Details Controller', () => {
  let mockRequest
  let mockH

  beforeEach(() => {
    mockRequest = {
      params: {},
      logger: {
        error: vi.fn()
      }
    }
    mockH = {
      view: vi.fn().mockReturnValue('mocked view response'),
      redirect: vi.fn().mockReturnValue('mocked redirect response')
    }
    vi.clearAllMocks()
  })

  describe('handler', () => {
    it('should redirect to home when no CPH provided', async () => {
      const result = await holdingDetailsController.handler(mockRequest, mockH)

      expect(mockH.redirect).toHaveBeenCalledWith('/')
      expect(result).toBe('mocked redirect response')
    })

    it('should display holding details when valid CPH provided and holding found', async () => {
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
      ApiClient.getHoldingByCph.mockResolvedValue(mockHolding)
      mockRequest.params = { cph: '12/123/1234' }

      const result = await holdingDetailsController.handler(mockRequest, mockH)

      expect(ApiClient.getHoldingByCph).toHaveBeenCalledWith('12/123/1234')
      expect(mockH.view).toHaveBeenCalledWith('holding-details/index', {
        pageTitle: 'Holding Details - 12/123/1234',
        heading: 'Holding Details - 12/123/1234',
        breadcrumbs: [
          {
            text: 'Search for Holding',
            href: '/'
          },
          {
            text: 'CPH 12/123/1234'
          }
        ],
        cph: '12/123/1234',
        holding: mockHolding,
        incidents: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            status: expect.any(String),
            statusClass: expect.any(String),
            dateReported: expect.any(String),
            incidentType: expect.any(String)
          })
        ]),
        errorMessage: null
      })
      expect(result).toBe('mocked view response')
    })

    it('should handle 404 error when holding not found', async () => {
      const notFoundError = new Error('404 Not Found')
      ApiClient.getHoldingByCph.mockRejectedValue(notFoundError)
      mockRequest.params = { cph: '99/999/9999' }

      const result = await holdingDetailsController.handler(mockRequest, mockH)

      expect(ApiClient.getHoldingByCph).toHaveBeenCalledWith('99/999/9999')
      expect(mockH.view).toHaveBeenCalledWith('holding-details/index', {
        pageTitle: 'Holding Details - 99/999/9999',
        heading: 'Holding Details - 99/999/9999',
        breadcrumbs: [
          {
            text: 'Search for Holding',
            href: '/'
          },
          {
            text: 'CPH 99/999/9999'
          }
        ],
        cph: '99/999/9999',
        holding: null,
        incidents: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            status: expect.any(String)
          })
        ]),
        errorMessage: 'No holding found with CPH number 99/999/9999'
      })
      expect(result).toBe('mocked view response')
    })

    it('should handle API errors gracefully', async () => {
      const apiError = new Error('Internal Server Error')
      ApiClient.getHoldingByCph.mockRejectedValue(apiError)
      mockRequest.params = { cph: '12/123/1234' }

      const result = await holdingDetailsController.handler(mockRequest, mockH)

      expect(ApiClient.getHoldingByCph).toHaveBeenCalledWith('12/123/1234')
      expect(mockH.view).toHaveBeenCalledWith('holding-details/index', {
        pageTitle: 'Holding Details - 12/123/1234',
        heading: 'Holding Details - 12/123/1234',
        breadcrumbs: [
          {
            text: 'Search for Holding',
            href: '/'
          },
          {
            text: 'CPH 12/123/1234'
          }
        ],
        cph: '12/123/1234',
        holding: null,
        incidents: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            status: expect.any(String)
          })
        ]),
        errorMessage: 'An error occurred while retrieving the holding details. Please try again.'
      })
      expect(result).toBe('mocked view response')
    })

    it('should handle unexpected errors', async () => {
      const unexpectedError = new Error('Unexpected error')
      mockH.view.mockImplementationOnce(() => {
        throw unexpectedError
      }).mockReturnValueOnce('mocked error view response')
      mockRequest.params = { cph: '12/123/1234' }

      const result = await holdingDetailsController.handler(mockRequest, mockH)

      expect(mockRequest.logger.error).toHaveBeenCalledWith('Error in holding details controller:', unexpectedError)
      expect(result).toBe('mocked error view response')
    })
  })
})
