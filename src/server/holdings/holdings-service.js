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

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        timeout: 10000 // 10 second timeout
      })

      if (response.status === 404) {
        return null // Holding not found
      }

      if (!response.ok) {
        const errorBody = await response.text()
        throw new Error(
          `API request failed with status ${response.status}: ${errorBody}`
        )
      }

      const holdingData = await response.json()
      return this.transformApiResponse(holdingData)
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('API request timed out')
      }
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
      apiData.contacts.forEach((contact) => {
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

  /**
   * Creates a new holding
   * @param {Object} holdingData - The holding data to create
   * @returns {Promise<Object>} - The created holding data
   * @throws {Error} - If API request fails
   */
  async createHolding(holdingData) {
    const url = `${this.baseUrl}/api/${this.apiVersion}/holdings`

    // Transform frontend data to backend format
    const backendPayload = this.transformToBackendFormat(holdingData)

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(backendPayload),
        timeout: 10000
      })

      if (!response.ok) {
        const errorBody = await response.text()
        throw new Error(
          `API request failed with status ${response.status}: ${errorBody}`
        )
      }

      const createdHolding = await response.json()
      return this.transformApiResponse(createdHolding)
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('API request timed out')
      }
      throw new Error(`Failed to create holding: ${error.message}`)
    }
  }

  /**
   * Transforms frontend holding data to backend API format
   * @param {Object} frontendData - Flattened frontend form data
   * @returns {Object} - Nested backend API format
   */
  transformToBackendFormat(frontendData) {
    const payload = {
      cph: frontendData.cph,
      name: frontendData.name
    }

    // Add optional description
    if (frontendData.description) {
      payload.description = frontendData.description
    }

    // Build address object if any address fields are present
    if (
      frontendData.street ||
      frontendData.locality ||
      frontendData.town ||
      frontendData.county ||
      frontendData.postcode
    ) {
      payload.address = {}
      if (frontendData.street) {
        payload.address.street = frontendData.street
      }
      if (frontendData.locality) {
        payload.address.locality = frontendData.locality
      }
      if (frontendData.town) {
        payload.address.town = frontendData.town
      }
      if (frontendData.county) {
        payload.address.county = frontendData.county
      }
      if (frontendData.postcode) {
        payload.address.postcode = frontendData.postcode
      }
    }

    // Build geolocation object if any geolocation fields are present
    if (frontendData.mapRef || frontendData.easting || frontendData.northing) {
      payload.geolocation = {}
      if (frontendData.mapRef) {
        payload.geolocation.mapReference = frontendData.mapRef
      }
      if (frontendData.easting) {
        payload.geolocation.easting = parseInt(frontendData.easting, 10)
      }
      if (frontendData.northing) {
        payload.geolocation.northing = parseInt(frontendData.northing, 10)
      }
    }

    // Build contacts array if any contact fields are present
    const contacts = []
    if (frontendData.telephone) {
      contacts.push({ type: 'telephone', value: frontendData.telephone })
    }
    if (frontendData.email) {
      contacts.push({ type: 'email', value: frontendData.email })
    }
    if (contacts.length > 0) {
      payload.contacts = contacts
    }

    return payload
  }
}

// Export singleton instance
export const holdingsService = new HoldingsService()
