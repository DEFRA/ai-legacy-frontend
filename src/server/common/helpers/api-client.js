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
   * Retrieves all TB status options with optional region filtering
   * @param {object} params - Query parameters for filtering TB statuses
   * @param {string} [params.region] - Optional region filter (e.g., "Midlands", "South West")
   * @returns {Promise<object>} Response object containing data array of TB status options
   * @returns {Promise<{data: Array<{code: string, description: string, regions: string[]}>}>} TB status options
   * @example
   * // Get all TB statuses
   * const allStatuses = await ApiClient.getTbStatuses()
   *
   * // Get TB statuses for specific region
   * const midlandsStatuses = await ApiClient.getTbStatuses({ region: 'Midlands' })
   */
  static async getTbStatuses (params = {}) {
    const searchParams = new URLSearchParams(params)
    const query = searchParams.toString() ? `?${searchParams.toString()}` : ''
    return this.get(`/api/v1/reference/tb-status${query}`)
  }

  /**
   * Fetches TB result reference data
   * @returns {Promise<object>} TB result options
   */
  static async getTbResults () {
    return this.get('/api/v1/reference/tb-result')
  }

  /**
   * Fetches allocation booking method reference data
   * @returns {Promise<object>} Allocation booking method options
   */
  static async getAllocationBookingMethods () {
    return this.get('/api/v1/reference/allocation-booking-method')
  }

  /**
   * Fetches allocation skip reason reference data
   * @returns {Promise<object>} Allocation skip reason options
   */
  static async getAllocationSkipReasons () {
    return this.get('/api/v1/reference/allocation-skip-reason')
  }

  /**
   * Fetches finishing unit reference data
   * @param {object} params - Query parameters for filtering finishing units
   * @param {string} [params.region] - Optional region filter
   * @returns {Promise<object>} Finishing unit options
   */
  static async getFinishingUnits (params = {}) {
    const searchParams = new URLSearchParams(params)
    const query = searchParams.toString() ? `?${searchParams.toString()}` : ''
    return this.get(`/api/v1/reference/finishing-unit${query}`)
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

  /**
   * Fetches holding data by CPH number
   * @param {string} cph - The CPH identifier (format: XX/XXX/XXXX)
   * @returns {Promise<object>} Holding data from the API
   */
  static async getHoldingByCph (cph) {
    return this.get(`/api/v1/holding/${encodeURIComponent(cph)}`)
  }
}
