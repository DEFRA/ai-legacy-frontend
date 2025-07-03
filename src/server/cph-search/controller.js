import { ApiClient } from '../common/helpers/api-client.js'

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
      const { cph } = request.query || {}
      let holding = null
      let errorMessage = null

      // If CPH is provided, attempt to search for it
      // CPH validation is handled in the route pre-handler
      if (cph) {
        try {
          holding = await ApiClient.getHoldingByCph(cph)
        } catch (error) {
          request.logger.error('Error fetching holding by CPH:', error)
          if (error.message.includes('404')) {
            errorMessage = `No holding found with CPH number ${cph}`
          } else {
            errorMessage = 'An error occurred while searching for the holding. Please try again.'
          }
        }
      }

      return h.view('cph-search/index', {
        pageTitle: 'Search for Holding',
        heading: 'Search for Holding',
        breadcrumbs: [
          {
            text: 'Home',
            href: '/'
          },
          {
            text: 'Search for Holding'
          }
        ],
        cph,
        holding,
        errorMessage
      })
    } catch (error) {
      request.logger.error('Error in CPH search controller:', error)
      return h.view('cph-search/index', {
        pageTitle: 'Search for Holding',
        heading: 'Search for Holding',
        breadcrumbs: [
          {
            text: 'Home',
            href: '/'
          },
          {
            text: 'Search for Holding'
          }
        ],
        errorMessage: 'An unexpected error occurred. Please try again.'
      })
    }
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
