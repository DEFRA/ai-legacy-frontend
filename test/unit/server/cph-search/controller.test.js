import { describe, it, expect, vi, beforeEach } from 'vitest'
import { cphSearchController } from '../../../../src/server/cph-search/controller.js'

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
    it('should render empty search page when no query parameters provided', async () => {
      const result = await cphSearchController.handler(mockRequest, mockH)

      expect(mockH.view).toHaveBeenCalledWith('cph-search/index', {
        pageTitle: 'Search for Holding',
        heading: 'Search for Holding',
        breadcrumbs: [
          {
            text: 'Search for Holding'
          }
        ],
        successMessage: null
      })
      expect(result).toBe('mocked view response')
    })

    it('should display success message when redirected from create', async () => {
      mockRequest.query = { created: 'true' }

      const result = await cphSearchController.handler(mockRequest, mockH)

      expect(mockH.view).toHaveBeenCalledWith('cph-search/index', {
        pageTitle: 'Search for Holding',
        heading: 'Search for Holding',
        breadcrumbs: [
          {
            text: 'Search for Holding'
          }
        ],
        successMessage: 'Holding was created successfully'
      })
      expect(result).toBe('mocked view response')
    })

    it('should handle unexpected errors', async () => {
      const unexpectedError = new Error('Unexpected error')
      mockH.view.mockImplementationOnce(() => {
        throw unexpectedError
      }).mockReturnValueOnce('mocked error view response')
      mockRequest.query = {}

      const result = await cphSearchController.handler(mockRequest, mockH)

      expect(mockRequest.logger.error).toHaveBeenCalledWith('Error in CPH search controller:', unexpectedError)
      expect(result).toBe('mocked error view response')
    })
  })
})
