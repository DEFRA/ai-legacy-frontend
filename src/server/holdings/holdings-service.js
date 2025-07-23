/**
 * Holdings API Service
 * Handles communication with the backend API for holdings data
 */

import { config } from '../../config/config.js'

/**
 * Service class for managing holdings API interactions
 */
class HoldingsService {
  constructor() {
    this.baseUrl = config.get('apiUrl') || 'http://localhost:3001'
    this.apiVersion = 'v1'
  }

  /**
   * Fetches holding information by CPH number
   * @param {string} cph - The CPH number to lookup (e.g., "12/345/6789")
   * @returns {Promise<Object|null>} - The holding data or null if not found
   * @throws {Error} - If API request fails or returns unexpected status
   */
  async getHoldingByCph(cph) {
    const encodedCph = encodeURIComponent(cph)
    const url = `${this.baseUrl}/api/${this.apiVersion}/holdings/${encodedCph}`
    console.log(`****Fetching holding data from API: ${url}`)

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        timeout: 10000 // 10 second timeout
      })

      if (response.status === 404) {
        return null // Holding not found
      }

      if (!response.ok) {
        const errorBody = await response.text()
        throw new Error(`API request failed with status ${response.status}: ${errorBody}`)
      }

      const holdingData = await response.json()
      return this.transformApiResponse(holdingData)
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('API request timed out')
      }
      console.log(error)
      throw new Error(`Failed to fetch holding data: ${error.message}`)
      
    }
  }

  /**
   * Transforms API response to match frontend expectations
   * @param {Object} apiData - Raw API response data
   * @returns {Object} - Transformed data for frontend use
   */
  transformApiResponse(apiData) {
    // Transform contacts array to object for easier template access
    const contacts = {}
    if (apiData.contacts && Array.isArray(apiData.contacts)) {
      apiData.contacts.forEach(contact => {
        contacts[contact.type] = contact.value
      })
    }

    return {
      ...apiData,
      contacts,
      metadata: {
        created: apiData.createdAt,
        lastUpdated: apiData.updatedAt,
        createdBy: 'System', // API doesn't return user info in current schema
        lastUpdatedBy: 'System'
      }
    }
  }
}

// Export singleton instance
export const holdingsService = new HoldingsService()
