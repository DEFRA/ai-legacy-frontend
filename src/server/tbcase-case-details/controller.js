import { ApiClient } from '../common/helpers/api-client.js'

/**
 * TBCMS TB Case Details controller.
 * @satisfies {Partial<ServerRoute>}
 */
export const tbCaseDetailsController = {
  async handler(request, h) {
    try {
      // Fetch TB status options from the backend API
      const tbStatusResponse = await ApiClient.getTbStatuses()
      const tbStatuses = tbStatusResponse.data || []

      // Get selected incident if provided in query params
      const selectedIncident = request.query.incident

      return h.view('tbcase-case-details/case-details', {
        pageTitle: 'TB Case Form',
        heading: 'TB Case Form',
        caption: 'Exeter Reactor Removals - Landing Page',
        tbStatuses,
        selectedIncident
      })
    } catch (error) {
      request.logger.error('Error loading TB case details page:', error)

      // Fallback to empty TB statuses if API call fails
      return h.view('tbcase-case-details/case-details', {
        pageTitle: 'TB Case Form',
        heading: 'TB Case Form',
        caption: 'Exeter Reactor Removals - Landing Page',
        tbStatuses: [],
        error: 'Unable to load reference data. Please try again later.'
      })
    }
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
