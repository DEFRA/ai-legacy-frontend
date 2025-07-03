import { ApiClient } from '../common/helpers/api-client.js'
import { validateStringParameter } from '../common/helpers/validation.js'

/**
 * TBCMS TB Case Details controller.
 * Handles GET requests for the TB case details form page
 * @satisfies {Partial<ServerRoute>}
 */
export const tbCaseDetailsController = {
  /**
   * Handler for TB case details page
   * @param {object} request - Hapi request object
   * @param {object} h - Hapi response toolkit
   * @returns {Promise<object>} Rendered view or error response
   */
  async handler (request, h) {
    try {
      // Validate and extract query parameters
      const { incident: selectedIncident } = request.query || {}

      // Validate incident parameter if provided
      if (selectedIncident) {
        validateStringParameter(selectedIncident, 'incident')
      }      // Fetch TB status options from the backend API
      const tbStatusResponse = await ApiClient.getTbStatuses()
      const tbStatuses = tbStatusResponse.data || []

      // Fetch TB result options from the backend API
      const tbResultResponse = await ApiClient.getTbResults()
      const tbResults = tbResultResponse.data || []

      // Prepare TB status items for the dropdown
      const tbStatusItems = [{ value: '', text: 'Please select' }]

      if (tbStatuses.length === 0) {
        throw new Error('No TB status options available from API')
      }

      tbStatuses.forEach((status) => {
        tbStatusItems.push({
          value: status.code,
          text: status.code
        })
      })

      // Prepare TB result items for the dropdown
      const tbResultItems = [{ value: '', text: 'Please select' }]

      if (tbResults.length === 0) {
        throw new Error('No TB result options available from API')
      }

      tbResults.forEach((result) => {
        tbResultItems.push({
          value: result.code,
          text: result.code
        })
      })

      return h.view('tbcase-case-details/case-details', {
        pageTitle: 'TB Case Form',
        heading: 'TB Case Form',
        caption: 'Exeter Reactor Removals - Landing Page',
        tbStatusItems,
        tbResultItems,
        selectedIncident
      })
    } catch (error) {
      request.logger.error('Error loading TB case details page:', error)

      // Re-throw the error instead of providing fallback data
      throw error
    }
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
