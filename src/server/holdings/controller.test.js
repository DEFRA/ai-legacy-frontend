import { describe, test, expect, vi } from 'vitest'
import { createHoldingController, viewHoldingController } from './controller.js'

describe('Holdings Controller', () => {
  describe('createHoldingController', () => {
    describe('GET /holdings/create', () => {
      test('Should return view with correct data', () => {
        const mockRequest = {}
        const mockH = {
          view: vi.fn().mockReturnValue('view-result')
        }

        const result = createHoldingController.get.handler(mockRequest, mockH)

        expect(mockH.view).toHaveBeenCalledWith('holdings/create', expect.objectContaining({
          pageTitle: 'Create New Holding',
          heading: 'Create New Holding'
        }))
        expect(result).toBe('view-result')
      })
    })

    describe('POST /holdings/create - Joi Validation', () => {
      test('Should use Joi schema for validation', () => {
        expect(createHoldingController.post.options.validate.payload).toBeDefined()
        expect(typeof createHoldingController.post.options.validate.failAction).toBe('function')
      })

      test('Should handle successful validation', () => {
        const validPayload = {
          cph: '12/345/6789',
          name: 'Test Farm',
          description: 'A test farm',
          telephone: '01234567890',
          email: 'test@example.com',
          street: '123 Farm Lane',
          locality: 'Little Village',
          town: 'Farmtown',
          county: 'Testshire',
          postcode: 'GL7 4AB',
          mapRef: 'SP123456',
          easting: 412345,
          northing: 267890
        }

        const mockRequest = { payload: validPayload }
        const mockH = {
          view: vi.fn().mockReturnValue('view-result')
        }

        const result = createHoldingController.post.handler(mockRequest, mockH)

        expect(mockH.view).toHaveBeenCalledWith('holdings/success', expect.objectContaining({
          holdingData: validPayload
        }))
        expect(result).toBe('view-result')
      })
    })
  })

  describe('viewHoldingController', () => {
    describe('GET /holdings/{cph}', () => {
      test('Should display holding information for valid CPH', () => {
        const mockRequest = {
          params: {
            cph: '12%2F345%2F6789' // URL encoded CPH
          }
        }
        const mockH = {
          view: vi.fn().mockReturnValue('view-result')
        }

        const result = viewHoldingController.get.handler(mockRequest, mockH)

        expect(mockH.view).toHaveBeenCalledWith('holdings/view', expect.objectContaining({
          pageTitle: 'View Holding - 12/345/6789',
          heading: 'Meadowbrook Farm',
          holding: expect.objectContaining({
            cph: '12/345/6789',
            name: 'Meadowbrook Farm'
          }),
          contacts: expect.objectContaining({
            telephone: '01234 567890',
            email: 'farmer@example.com'
          })
        }))
        expect(result).toBe('view-result')
      })

      test('Should return 404 for non-existent holding', () => {
        const mockRequest = {
          params: {
            cph: 'nonexistent'
          }
        }
        const mockH = {
          response: vi.fn().mockReturnValue({
            code: vi.fn().mockReturnValue('404-result')
          })
        }

        const result = viewHoldingController.get.handler(mockRequest, mockH)

        expect(mockH.response).toHaveBeenCalledWith('Holding not found')
        expect(result.code).toHaveBeenCalledWith(404)
      })
    })
  })
})