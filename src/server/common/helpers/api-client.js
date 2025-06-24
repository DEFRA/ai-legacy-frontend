import { config } from '../../../config/config.js'

const BACKEND_API_URL = config.get('backendApiUrl')

export class ApiClient {
  static async get(endpoint) {
    const response = await fetch(`${BACKEND_API_URL}${endpoint}`)
    if (!response.ok) {
      throw new Error(
        `API request failed: ${response.status} ${response.statusText}`
      )
    }
    return await response.json()
  }

  static async getTbStatuses() {
    return this.get('/api/v1/reference/tb-status')
  }

  static async getCases(params = {}) {
    const searchParams = new URLSearchParams(params)
    const query = searchParams.toString() ? `?${searchParams.toString()}` : ''
    return this.get(`/api/v1/cases${query}`)
  }

  static async getCaseByIncident(natInc) {
    return this.get(`/api/v1/cases/${natInc}`)
  }

  static async getCaseDetails(natInc) {
    return this.get(`/api/v1/cases/${natInc}/details`)
  }

  static async getCphData(cph) {
    return this.get(`/api/v1/cph/${cph}`)
  }
}
