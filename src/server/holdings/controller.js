import { createHoldingSchema } from './schema.js'
import { holdingsService } from './holdings-service.js'

/**
 * Controllers for creating new holdings.
 * Handles GET requests to display the form and POST requests to process form submissions.
 */

/**
 * Transform Joi validation errors to GDS format
 * Converts Joi error details into the structure expected by GDS error components
 * @param {Object} joiError - Joi validation error object containing details array
 * @returns {Object} - Object containing errors and errorSummary for GDS components
 */
function transformJoiErrors(joiError) {
  const errors = {}
  const errorList = []

  joiError.details.forEach(detail => {
    const field = detail.path[0]
    errors[field] = {
      text: detail.message
    }
    errorList.push({
      text: detail.message,
      href: `#${field}`
    })
  })

  return {
    errors,
    errorSummary: {
      titleText: 'There is a problem',
      errorList
    }
  }
}

export const createHoldingController = {
  get: {
    handler(_request, h) {
      return h.view('holdings/create', {
        pageTitle: 'Create New Holding',
        heading: 'Create New Holding',
        breadcrumbs: [
          {
            text: 'Home',
            href: '/'
          },
          {
            text: 'Create New Holding'
          }
        ]
      })
    }
  },

  post: {
    options: {
      validate: {
        payload: createHoldingSchema,
        failAction: async (request, h, err) => {
          const { errors, errorSummary } = transformJoiErrors(err)
          
          return h.view('holdings/create', {
            pageTitle: 'Create New Holding',
            heading: 'Create New Holding',
            breadcrumbs: [
              {
                text: 'Home',
                href: '/'
              },
              {
                text: 'Create New Holding'
              }
            ],
            errors,
            values: request.payload,
            errorSummary
          }).takeover()
        }
      }
    },
    handler(request, h) {
      const payload = request.payload

      // If validation passes, show success message
      // In a real application, this would save to database via API
      return h.view('holdings/success', {
        pageTitle: 'Holding Created Successfully',
        heading: 'Holding Created Successfully',
        breadcrumbs: [
          {
            text: 'Home',
            href: '/'
          },
          {
            text: 'Create New Holding',
            href: '/holdings/create'
          },
          {
            text: 'Success'
          }
        ],
        holdingData: payload
      })
    }
  }
}

export const viewHoldingController = {
  get: {
    async handler(request, h) {
      const { cph } = request.params
      
      // Decode the CPH parameter (handle URL encoding of slashes)
      const decodedCph = decodeURIComponent(cph)
      
      try {
        // Get holding data from API
        const holdingData = await holdingsService.getHoldingByCph(decodedCph)
        
        if (!holdingData) {
          return h.response('Holding not found').code(404)
        }

        return h.view('holdings/view', {
          pageTitle: `View Holding - ${holdingData.cph}`,
          heading: `${holdingData.name}`,
          breadcrumbs: [
            {
              text: 'Home',
              href: '/'
            },
            {
              text: 'View Holding'
            }
          ],
          holding: holdingData,
          contacts: holdingData.contacts,
          formatDate: function formatDate(date) {
            return new Date(date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })
          }
        })
      } catch (error) {
        // Log error for debugging
        request.logger?.error('Failed to fetch holding data', { cph: decodedCph, error: error.message })
        console.log(error)
        // Return error page
        return h.view('error/index', {
          pageTitle: 'Service Unavailable',
          heading: 'Service Unavailable',
          message: 'Unable to retrieve holding information at this time. Please try again later.'
        }).code(500)
      }
    }
  }
}
