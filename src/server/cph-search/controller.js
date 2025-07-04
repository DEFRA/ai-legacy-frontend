/**
 * CPH Search controller.
 * Handles GET requests for CPH search functionality
 * @satisfies {Partial<ServerRoute>}
 */
export const cphSearchController = {
  /**
   * Handler for CPH search page
   * @param {object} request - Hapi request object
   * @param {object} h - Hapi response toolkit
   * @returns {Promise<object>} Rendered view or error response
   */
  async handler (request, h) {
    try {
      const { created } = request.query || {}
      let successMessage = null

      // Check if this is a redirect from successful creation
      if (created === 'true') {
        successMessage = 'Holding was created successfully'
      }

      return h.view('cph-search/index', {
        pageTitle: 'Search for Holding',
        heading: 'Search for Holding',
        breadcrumbs: [
          {
            text: 'Search for Holding'
          }
        ],
        successMessage
      })
    } catch (error) {
      request.logger.error('Error in CPH search controller:', error)
      return h.view('cph-search/index', {
        pageTitle: 'Search for Holding',
        heading: 'Search for Holding',
        breadcrumbs: [
          {
            text: 'Search for Holding'
          }
        ],
        errorMessage: 'An unexpected error occurred. Please try again.',
        successMessage: null
      })
    }
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
