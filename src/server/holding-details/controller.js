import { ApiClient } from '../common/helpers/api-client.js'

/**
 * Holding Details controller.
 * Handles GET requests for displaying holding information
 * @satisfies {Partial<ServerRoute>}
 */
export const holdingDetailsController = {
  /**
   * Handler for holding details page
   * @param {object} request - Hapi request object
   * @param {object} h - Hapi response toolkit
   * @returns {Promise<object>} Rendered view or error response
   */
  async handler (request, h) {
    try {
      const { cph } = request.params || {}
      let holding = null
      let errorMessage = null

      if (!cph) {
        return h.redirect('/')
      }

      try {
        holding = await ApiClient.getHoldingByCph(cph)
      } catch (error) {
        request.logger.error('Error fetching holding by CPH:', error)
        if (error.message.includes('404')) {
          errorMessage = `No holding found with CPH number ${cph}`
        } else {
          errorMessage = 'An error occurred while retrieving the holding details. Please try again.'
        }
      }

      return h.view('holding-details/index', {
        pageTitle: `Holding Details - ${cph}`,
        heading: `Holding Details - ${cph}`,
        breadcrumbs: [
          {
            text: 'Search for Holding',
            href: '/'
          },
          {
            text: `CPH ${cph}`
          }
        ],
        cph,
        holding,
        errorMessage
      })
    } catch (error) {
      request.logger.error('Error in holding details controller:', error)
      return h.view('holding-details/index', {
        pageTitle: 'Holding Details',
        heading: 'Holding Details',
        breadcrumbs: [
          {
            text: 'Search for Holding',
            href: '/'
          },
          {
            text: 'Holding Details'
          }
        ],
        cph: request.params?.cph,
        holding: null,
        errorMessage: 'An unexpected error occurred. Please try again.'
      })
    }
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
