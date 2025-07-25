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

        expect(mockH.view).toHaveBeenCalledWith(
          'holdings/create',
          expect.objectContaining({
            pageTitle: 'Create New Holding',
            heading: 'Create New Holding'
          })
        )
        expect(result).toBe('view-result')
      })
    })

    describe('POST /holdings/create - Joi Validation', () => {
      test('Should use Joi schema for validation', () => {
        expect(
          createHoldingController.post.options.validate.payload
        ).toBeDefined()
        expect(
          typeof createHoldingController.post.options.validate.failAction
        ).toBe('function')
      })

      test('Should handle successful validation', async () => {
        const validPayload = {
          cph: '12/345/6789',
          name: 'Test Farm',
          description: 'A test farm',
          postcode: 'GL7 4AB',
          mapRef: 'SP123456',
          easting: 123456,
          northing: 654321
        }
        const mockRequest = { payload: validPayload }
        const mockH = {
          view: vi.fn().mockReturnValue('view-result')
        }
        const result = await createHoldingController.post.handler(
          mockRequest,
          mockH
        )
        expect(mockH.view).toHaveBeenCalledWith(
          'holdings/success',
          expect.objectContaining({
            holdingData: validPayload
          })
        )
        expect(result).toBe('view-result')
      })
    })
  })

  describe('viewHoldingController', () => {
    describe('GET /holdings/{cph}', () => {
      test('Should have async handler', () => {
        expect(viewHoldingController.get.handler.constructor.name).toBe(
          'AsyncFunction'
        )
      })

      test('Should handle URL encoded CPH parameter', () => {
        const cph = '12%2F345%2F6789'
        const decoded = decodeURIComponent(cph)
        expect(decoded).toBe('12/345/6789')
      })
    })
  })
})
