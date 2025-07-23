import { createHoldingSchema } from './schema.js'

/**
 * Controllers for creating new holdings.
 * Handles GET requests to display the form and POST requests to process form submissions.
 */

/**
 * Transform Joi validation errors to GDS format
 * @param {Object} joiError - Joi validation error object
 * @returns {Object} - Formatted errors for GDS components
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
      // In a real application, this would save to database
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
