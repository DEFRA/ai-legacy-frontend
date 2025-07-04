import { describe, it, expect, vi, beforeEach } from 'vitest'
import { cphCreateController } from '../../../../src/server/cph-create/controller.js'
import { ApiClient } from '../../../../src/server/common/helpers/api-client.js'

// Mock the API client
vi.mock('../../../../src/server/common/helpers/api-client.js', () => ({
  ApiClient: {
    createHolding: vi.fn()
  }
}))

describe('CPH Create Controller', () => {
  let mockRequest
  let mockH

  beforeEach(() => {
    mockRequest = {
      method: 'get',
      payload: {},
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
    it('should render empty create form for GET request', async () => {
      const result = await cphCreateController.handler(mockRequest, mockH)

      expect(mockH.view).toHaveBeenCalledWith('cph-create/index', {
        pageTitle: 'Create New Holding',
        heading: 'Create New Holding',
        breadcrumbs: [
          {
            text: 'Home',
            href: '/'
          },
          {
            text: 'Search for Holding',
            href: '/cph-search'
          },
          {
            text: 'Create New Holding'
          }
        ],
        formData: {},
        errors: {}
      })
      expect(result).toBe('mocked view response')
    })

    it('should create holding and redirect on successful POST', async () => {
      const mockFormData = {
        details: {
          cph: '99/888/7777',
          name: 'Test Farm',
          address: {
            town: 'Test Town',
            county: 'Test County',
            postcode: 'TS1 2TF'
          }
        }
      }

      mockRequest.method = 'post'
      mockRequest.payload = mockFormData
      ApiClient.createHolding.mockResolvedValue({ message: 'Success' })

      const result = await cphCreateController.handler(mockRequest, mockH)

      expect(ApiClient.createHolding).toHaveBeenCalledWith(mockFormData)
      expect(mockH.redirect).toHaveBeenCalledWith('/cph-search?cph=99%2F888%2F7777&created=true')
      expect(result).toBe('mocked redirect response')
    })

    it('should handle duplicate CPH error', async () => {
      const mockFormData = {
        details: {
          cph: '12/123/1234',
          name: 'Test Farm',
          address: {
            town: 'Test Town',
            county: 'Test County',
            postcode: 'TS1 2TF'
          }
        }
      }

      mockRequest.method = 'post'
      mockRequest.payload = mockFormData
      ApiClient.createHolding.mockRejectedValue(new Error('409 Conflict'))

      const result = await cphCreateController.handler(mockRequest, mockH)

      expect(mockH.view).toHaveBeenCalledWith('cph-create/index', {
        pageTitle: 'Create New Holding',
        heading: 'Create New Holding',
        breadcrumbs: [
          {
            text: 'Home',
            href: '/'
          },
          {
            text: 'Search for Holding',
            href: '/cph-search'
          },
          {
            text: 'Create New Holding'
          }
        ],
        formData: mockFormData,
        errors: { cph: 'This CPH number already exists' },
        errorMessage: 'A holding with CPH number 12/123/1234 already exists'
      })
      expect(result).toBe('mocked view response')
    })

    it('should handle validation errors', async () => {
      const mockFormData = {
        details: {
          cph: '12/123/1234',
          name: 'Test Farm',
          address: {
            town: 'Test Town',
            county: 'Test County',
            postcode: 'TS1 2TF'
          }
        }
      }

      mockRequest.method = 'post'
      mockRequest.payload = mockFormData
      ApiClient.createHolding.mockRejectedValue(new Error('400 Bad Request validation'))

      const result = await cphCreateController.handler(mockRequest, mockH)

      expect(mockH.view).toHaveBeenCalledWith('cph-create/index', {
        pageTitle: 'Create New Holding',
        heading: 'Create New Holding',
        breadcrumbs: [
          {
            text: 'Home',
            href: '/'
          },
          {
            text: 'Search for Holding',
            href: '/cph-search'
          },
          {
            text: 'Create New Holding'
          }
        ],
        formData: mockFormData,
        errors: {},
        errorMessage: 'Please check the form data and try again'
      })
      expect(result).toBe('mocked view response')
    })

    it('should handle API errors gracefully', async () => {
      const mockFormData = {
        details: {
          cph: '12/123/1234',
          name: 'Test Farm',
          address: {
            town: 'Test Town',
            county: 'Test County',
            postcode: 'TS1 2TF'
          }
        }
      }

      mockRequest.method = 'post'
      mockRequest.payload = mockFormData
      ApiClient.createHolding.mockRejectedValue(new Error('Internal Server Error'))

      const result = await cphCreateController.handler(mockRequest, mockH)

      expect(mockH.view).toHaveBeenCalledWith('cph-create/index', {
        pageTitle: 'Create New Holding',
        heading: 'Create New Holding',
        breadcrumbs: [
          {
            text: 'Home',
            href: '/'
          },
          {
            text: 'Search for Holding',
            href: '/cph-search'
          },
          {
            text: 'Create New Holding'
          }
        ],
        formData: mockFormData,
        errors: {},
        errorMessage: 'An error occurred while creating the holding. Please try again.'
      })
      expect(result).toBe('mocked view response')
    })

    it('should handle unexpected errors', async () => {
      const unexpectedError = new Error('Unexpected error')
      mockH.view.mockImplementationOnce(() => {
        throw unexpectedError
      }).mockReturnValueOnce('mocked error view response')

      const result = await cphCreateController.handler(mockRequest, mockH)

      expect(mockRequest.logger.error).toHaveBeenCalledWith('Error in CPH create controller:', unexpectedError)
      expect(mockH.view).toHaveBeenCalledWith('cph-create/index', {
        pageTitle: 'Create New Holding',
        heading: 'Create New Holding',
        breadcrumbs: [
          {
            text: 'Home',
            href: '/'
          },
          {
            text: 'Search for Holding',
            href: '/cph-search'
          },
          {
            text: 'Create New Holding'
          }
        ],
        formData: {},
        errors: {},
        errorMessage: 'An unexpected error occurred. Please try again.'
      })
      expect(result).toBe('mocked error view response')
    })
  })
})
