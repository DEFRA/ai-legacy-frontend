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

      // Generate synthetic TB incidents data for demonstration
      const syntheticIncidents = [
        {
          id: 'TB-2024-001',
          status: 'Active',
          statusClass: 'govuk-tag--red',
          dateReported: '12 November 2024',
          incidentType: 'Confirmed TB breakdown',
          animalsAffected: '3 cattle (2 confirmed positive, 1 suspected)',
          lastTestDate: '28 November 2024',
          nextActionDue: 'Radial testing - 15 January 2025',
          hasManageAction: true
        },
        {
          id: 'TB-2023-017',
          status: 'Resolved',
          statusClass: 'govuk-tag--green',
          dateReported: '23 March 2023',
          dateResolved: '15 August 2023',
          incidentType: 'Routine surveillance positive',
          animalsAffected: '1 cattle (confirmed positive)',
          finalOutcome: 'Animal removed, herd cleared after testing',
          hasManageAction: false
        },
        {
          id: 'TB-2024-023',
          status: 'Under investigation',
          statusClass: 'govuk-tag--yellow',
          dateReported: '3 December 2024',
          incidentType: 'Suspect lesions at slaughter',
          animalsAffected: '1 cattle (awaiting laboratory results)',
          expectedResults: 'Laboratory confirmation - 10 January 2025',
          nextActionDue: 'Herd testing if confirmed positive',
          hasManageAction: true
        }
      ]

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
        incidents: syntheticIncidents,
        errorMessage
      })
    } catch (error) {
      request.logger.error('Error in holding details controller:', error)

      // Still provide synthetic incidents data even on error
      const syntheticIncidents = [
        {
          id: 'TB-2024-001',
          status: 'Active',
          statusClass: 'govuk-tag--red',
          dateReported: '12 November 2024',
          incidentType: 'Confirmed TB breakdown',
          animalsAffected: '3 cattle (2 confirmed positive, 1 suspected)',
          lastTestDate: '28 November 2024',
          nextActionDue: 'Radial testing - 15 January 2025',
          hasManageAction: true
        }
      ]

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
        incidents: syntheticIncidents,
        errorMessage: 'An unexpected error occurred. Please try again.'
      })
    }
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
