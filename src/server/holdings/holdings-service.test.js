import { describe, test, expect, vi, beforeEach } from 'vitest'
import { holdingsService } from './holdings-service.js'

// Mock the config module
vi.mock('../../config/index.js', () => ({
  config: {
    get: vi.fn().mockReturnValue('http://localhost:3001')
  }
}))

// Mock fetch globally
global.fetch = vi.fn()

describe('Holdings Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getHoldingByCph', () => {
    test('Should fetch holding data successfully', async () => {
      const mockApiResponse = {
        cph: '12/345/6789',
        name: 'Test Farm',
        contacts: [
          { type: 'telephone', value: '01234567890' },
          { type: 'email', value: 'test@example.com' }
        ],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-02T00:00:00Z'
      }

      fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockApiResponse
      })

      const result = await holdingsService.getHoldingByCph('12/345/6789')

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3001/api/v1/holdings/12%2F345%2F6789',
        expect.objectContaining({
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        })
      )

      expect(result).toEqual(
        expect.objectContaining({
          cph: '12/345/6789',
          name: 'Test Farm',
          contacts: {
            telephone: '01234567890',
            email: 'test@example.com'
          },
          metadata: expect.objectContaining({
            created: '2024-01-01T00:00:00Z',
            lastUpdated: '2024-01-02T00:00:00Z'
          })
        })
      )
    })

    test('Should return null for 404 response', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 404
      })

      const result = await holdingsService.getHoldingByCph('nonexistent')

      expect(result).toBeNull()
    })

    test('Should throw error for API failures', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        text: async () => 'Internal Server Error'
      })

      await expect(
        holdingsService.getHoldingByCph('12/345/6789')
      ).rejects.toThrow('API request failed with status 500')
    })

    test('Should handle network errors', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'))

      await expect(
        holdingsService.getHoldingByCph('12/345/6789')
      ).rejects.toThrow('Failed to fetch holding data: Network error')
    })
  })

  describe('transformApiResponse', () => {
    test('Should transform contacts array to object', () => {
      const apiData = {
        cph: '12/345/6789',
        contacts: [
          { type: 'telephone', value: '01234567890' },
          { type: 'email', value: 'test@example.com' }
        ],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-02T00:00:00Z'
      }

      const result = holdingsService.transformApiResponse(apiData)

      expect(result.contacts).toEqual({
        telephone: '01234567890',
        email: 'test@example.com'
      })

      expect(result.metadata).toEqual({
        created: '2024-01-01T00:00:00Z',
        lastUpdated: '2024-01-02T00:00:00Z',
        createdBy: 'System',
        lastUpdatedBy: 'System'
      })
    })

    test('Should handle missing contacts array', () => {
      const apiData = {
        cph: '12/345/6789',
        createdAt: '2024-01-01T00:00:00Z'
      }

      const result = holdingsService.transformApiResponse(apiData)

      expect(result.contacts).toEqual({})
    })
  })
})
