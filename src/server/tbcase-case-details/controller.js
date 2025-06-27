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
  async handler(request, h) {
    try {
      // Validate and extract query parameters
      const { incident: selectedIncident } = request.query || {}

      // Validate incident parameter if provided
      if (selectedIncident) {
        validateStringParameter(selectedIncident, 'incident')
      }

      // Fetch TB status options from the backend API
      const tbStatusResponse = await ApiClient.getTbStatuses()
      const tbStatuses = tbStatusResponse.data || []

      // Prepare TB status items for the dropdown
      const tbStatusItems = [{ value: '', text: 'Please select' }]
      if (tbStatuses.length > 0) {
        tbStatuses.forEach((status) => {
          tbStatusItems.push({
            value: status.status_abb,
            text: `${status.status_abb} - ${status.status}`
          })
        })
      } else {
        // Fallback hard-coded options if API data is unavailable
        tbStatusItems.push(
          { value: 'CL', text: 'CL - Clear' },
          { value: 'TB', text: 'TB - TB Confirmed' },
          { value: 'SUS', text: 'SUS - Suspect' },
          { value: 'WD', text: 'WD - Withdrawn' }
        )
      }

      return h.view('tbcase-case-details/case-details', {
        pageTitle: 'TB Case Form',
        heading: 'TB Case Form',
        caption: 'Exeter Reactor Removals - Landing Page',
        tbStatusItems,
        selectedIncident
      })
    } catch (error) {
      request.logger.error('Error loading TB case details page:', error)

      // Fallback to empty TB statuses if API call fails
      return h.view('tbcase-case-details/case-details', {
        pageTitle: 'TB Case Form',
        heading: 'TB Case Form',
        caption: 'Exeter Reactor Removals - Landing Page',
        tbStatusItems: [
          { value: '', text: 'Please select' },
          { value: 'CL', text: 'CL - Clear' },
          { value: 'TB', text: 'TB - TB Confirmed' },
          { value: 'SUS', text: 'SUS - Suspect' },
          { value: 'WD', text: 'WD - Withdrawn' }
        ],
        error: 'Unable to load reference data. Please try again later.'
      })
    }
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
