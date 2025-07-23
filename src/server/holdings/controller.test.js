import { describe, test, expect } from 'vitest'
import { createHoldingController } from './controller.js'

describe('Holdings Controller', () => {
  describe('GET /holdings/create', () => {
    test('Should return view with correct data', () => {
      const mockRequest = {}
      const mockH = {
        view: (template, data) => ({ template, data })
      }

      const result = createHoldingController.get.handler(mockRequest, mockH)

      expect(result.template).toBe('holdings/create')
      expect(result.data.pageTitle).toBe('Create New Holding')
      expect(result.data.heading).toBe('Create New Holding')
      expect(result.data.breadcrumbs).toHaveLength(2)
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
        view: (template, data) => ({ template, data })
      }

      const result = createHoldingController.post.handler(mockRequest, mockH)

      expect(result.template).toBe('holdings/success')
      expect(result.data.holdingData).toEqual(validPayload)
    })
  })
})
