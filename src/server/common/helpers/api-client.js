import { config } from '../../../config/config.js'

const BACKEND_API_URL = config.get('backendApiUrl')

/**
 * API client for communicating with the backend service
 * Provides methods for fetching TB case and reference data
 */
export class ApiClient {
  /**
   * Makes a GET request to the specified API endpoint
   * @param {string} endpoint - The API endpoint path
   * @returns {Promise<object>} The JSON response from the API
   * @throws {Error} When the API request fails
   */
  static async get (endpoint) {
    const response = await fetch(`${BACKEND_API_URL}${endpoint}`)
    if (!response.ok) {
      throw new Error(
        `API request failed: ${response.status} ${response.statusText}`
      )
    }
    return await response.json()
  }

  /**
   * Fetches TB status reference data
   * @param {string} [region] - Optional region filter
   * @returns {Promise<object>} TB status options
   */
  static async getTbStatuses (region = null) {
    const endpoint = region
      ? `/api/v1/reference/tb-status?region=${encodeURIComponent(region)}`
      : '/api/v1/reference/tb-status'
    return this.get(endpoint)
  }

  /**
   * Fetches finishing unit reference data
   * @param {string} [region] - Optional region filter
   * @returns {Promise<object>} Finishing unit options
   */
  static async getFinishingUnits (region = null) {
    const endpoint = region
      ? `/api/v1/reference/finishing-unit?region=${encodeURIComponent(region)}`
      : '/api/v1/reference/finishing-unit'
    return this.get(endpoint)
  }

  /**
   * Fetches TB cases with optional filtering parameters
   * @param {object} params - Query parameters for filtering cases
   * @returns {Promise<object>} TB cases data
   */
  static async getCases (params = {}) {
    const searchParams = new URLSearchParams(params)
    const query = searchParams.toString() ? `?${searchParams.toString()}` : ''
    return this.get(`/api/v1/cases${query}`)
  }

  /**
   * Fetches a specific TB case by incident number
   * @param {string} natInc - The national incident number
   * @returns {Promise<object>} TB case data
   */
  static async getCaseByIncident (natInc) {
    return this.get(`/api/v1/cases/${natInc}`)
  }

  /**
   * Fetches detailed information for a specific TB case
   * @param {string} natInc - The national incident number
   * @returns {Promise<object>} Detailed TB case data
   */
  static async getCaseDetails (natInc) {
    return this.get(`/api/v1/cases/${natInc}/details`)
  }

  /**
   * Fetches County Parish Holding (CPH) data
   * @param {string} cph - The CPH identifier
   * @returns {Promise<object>} CPH data
   */
  static async getCphData (cph) {
    return this.get(`/api/v1/cph/${cph}`)
  }
}
