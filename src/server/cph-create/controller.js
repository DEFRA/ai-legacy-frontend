import { ApiClient } from '../common/helpers/api-client.js'

/**
 * CPH Create controller.
 * Handles GET and POST requests for CPH creation functionality
 * @satisfies {Partial<ServerRoute>}
 */
export const cphCreateController = {
  /**
   * Handler for CPH create page
   * @param {object} request - Hapi request object
   * @param {object} h - Hapi response toolkit
   * @returns {Promise<object>} Rendered view or redirect response
   */
  async handler (request, h) {
    try {
      if (request.method === 'get') {
        // Display the create form
        return h.view('cph-create/index', {
          pageTitle: 'Create New Holding',
          heading: 'Create New Holding',
          breadcrumbs: [
            {
              text: 'Home',
              href: '/'
            },
            {
              text: 'Search for Holding',
              href: '/cph-search'
            },
            {
              text: 'Create New Holding'
            }
          ],
          formData: {},
          errors: {}
        })
      }

      if (request.method === 'post') {
        // Process form submission
        const formData = request.payload

        // Transform flat form data to nested structure for API
        const transformedData = {
          details: {
            cph: formData.cph,
            name: formData.name,
            description: formData.description || '',
            address: {
              street: formData.street || '',
              locality: formData.locality || '',
              town: formData.town,
              county: formData.county,
              postcode: formData.postcode
            },
            geolocation: {
              mapReference: formData.mapReference || '',
              easting: formData.easting ? parseInt(formData.easting) : null,
              northing: formData.northing ? parseInt(formData.northing) : null
            },
            contacts: []
          }
        }

        // Add contacts if they have values
        if (formData.landline && formData.landline.trim()) {
          transformedData.details.contacts.push({
            type: 'landline',
            value: formData.landline.trim()
          })
        }
        if (formData.mobile && formData.mobile.trim()) {
          transformedData.details.contacts.push({
            type: 'mobile',
            value: formData.mobile.trim()
          })
        }
        if (formData.email && formData.email.trim()) {
          transformedData.details.contacts.push({
            type: 'email',
            value: formData.email.trim()
          })
        }

        request.logger.info('Creating CPH holding', { cph: formData.cph })

        try {
          // Create the holding via API using transformed data
          await ApiClient.createHolding(transformedData)

          // Redirect to search page with success message showing the created holding
          return h.redirect(`/cph-search?cph=${encodeURIComponent(formData.cph)}&created=true`)
        } catch (error) {
          request.logger.error('Error creating holding:', error)

          let errorMessage = 'An error occurred while creating the holding. Please try again.'
          const errors = {}

          // Handle specific API errors
          if (error.message.includes('409') || error.message.includes('Conflict')) {
            errorMessage = `A holding with CPH number ${formData.cph} already exists`
            errors['cph'] = 'This CPH number already exists'
          } else if (error.message.includes('400') || error.message.includes('validation')) {
            errorMessage = 'Please check the form data and try again'
            // You could parse validation errors from the API response here
          }

          // Redisplay form with errors
          return h.view('cph-create/index', {
            pageTitle: 'Create New Holding',
            heading: 'Create New Holding',
            breadcrumbs: [
              {
                text: 'Home',
                href: '/'
              },
              {
                text: 'Search for Holding',
                href: '/cph-search'
              },
              {
                text: 'Create New Holding'
              }
            ],
            formData,
            errors,
            errorMessage
          })
        }
      }

      // Should not reach here, but handle gracefully
      return h.view('cph-create/index', {
        pageTitle: 'Create New Holding',
        heading: 'Create New Holding',
        breadcrumbs: [
          {
            text: 'Home',
            href: '/'
          },
          {
            text: 'Search for Holding',
            href: '/cph-search'
          },
          {
            text: 'Create New Holding'
          }
        ],
        formData: {},
        errors: {},
        errorMessage: 'Invalid request method'
      })
    } catch (error) {
      request.logger.error('Error in CPH create controller:', error)
      return h.view('cph-create/index', {
        pageTitle: 'Create New Holding',
        heading: 'Create New Holding',
        breadcrumbs: [
          {
            text: 'Home',
            href: '/'
          },
          {
            text: 'Search for Holding',
            href: '/cph-search'
          },
          {
            text: 'Create New Holding'
          }
        ],
        formData: {},
        errors: {},
        errorMessage: 'An unexpected error occurred. Please try again.'
      })
    }
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
