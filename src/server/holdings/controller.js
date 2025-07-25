import { createHoldingSchema, searchHoldingSchema } from './schema.js'
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

/**
 * Searches for a holding by CPH and redirects to view page or shows error
 * @param {Object} request - Hapi request object
 * @param {Object} h - Hapi response toolkit
 * @returns {Object} Response object - either redirect or error view
 */
async function searchForHoldingByCph(request, h) {
  const { cph } = request.payload
  
  try {
    // Search for holding using the service
    const holdingData = await holdingsService.getHoldingByCph(cph)
    
    if (!holdingData) {
      // No holding found - show error on search page
      return h.view('holdings/search', {
        pageTitle: 'Search Holdings',
        heading: 'Search Holdings',
        breadcrumbs: [
          {
            text: 'Home',
            href: '/'
          },
          {
            text: 'Search Holdings'
          }
        ],
        errors: {
          cph: {
            text: `No holding found with CPH number '${cph}'. Check the number and try again.`
          }
        },
        values: request.payload,
        errorSummary: {
          titleText: 'There is a problem',
          errorList: [
            {
              text: `No holding found with CPH number '${cph}'. Check the number and try again.`,
              href: '#cph'
            }
          ]
        }
      })
    }
    
    // Holding found - redirect to view page
    const encodedCph = encodeURIComponent(cph)
    return h.redirect(`/holdings/${encodedCph}`)
    
  } catch (error) {
    // Log error for debugging
    request.logger?.error('Failed to search for holding', { cph, error: error.message })
    
    // Show generic error on search page
    return h.view('holdings/search', {
      pageTitle: 'Search Holdings',
      heading: 'Search Holdings',
      breadcrumbs: [
        {
          text: 'Home',
          href: '/'
        },
        {
          text: 'Search Holdings'
        }
      ],
      errors: {
        cph: {
          text: 'Unable to search for holdings at this time. Please try again later.'
        }
      },
      values: request.payload,
      errorSummary: {
        titleText: 'There is a problem',
        errorList: [
          {
            text: 'Unable to search for holdings at this time. Please try again later.',
            href: '#cph'
          }
        ]
      }
    })
  }
}

/**
 * Handler for GET request to create holding form
 * @param {Object} _request - Hapi request object (unused)
 * @param {Object} h - Hapi response toolkit
 * @returns {Object} Response object with create form view
 */
function getCreateHolding(_request, h) {
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

/**
 * Handler for POST request to create holding
 * @param {Object} request - Hapi request object
 * @param {Object} h - Hapi response toolkit
 * @returns {Object} Response object with success view
 */
function postCreateHolding(request, h) {
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

/**
 * Handler for GET request to search holdings form
 * @param {Object} _request - Hapi request object (unused)
 * @param {Object} h - Hapi response toolkit
 * @returns {Object} Response object with search form view
 */
function getSearchHolding(_request, h) {
  return h.view('holdings/search', {
    pageTitle: 'Search Holdings',
    heading: 'Search Holdings',
    breadcrumbs: [
      {
        text: 'Home',
        href: '/'
      },
      {
        text: 'Search Holdings'
      }
    ]
  })
}

/**
 * Handler for GET request to view a specific holding
 * @param {Object} request - Hapi request object
 * @param {Object} h - Hapi response toolkit
 * @returns {Object} Response object with holding view or error
 */
async function getViewHolding(request, h) {
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

export const createHoldingController = {
  get: {
    handler: getCreateHolding
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
    handler: postCreateHolding
  }
}

export const searchHoldingController = {
  get: {
    handler: getSearchHolding
  },

  post: {
    options: {
      validate: {
        payload: searchHoldingSchema,
        failAction: async (request, h, err) => {
          const { errors, errorSummary } = transformJoiErrors(err)
          
          return h.view('holdings/search', {
            pageTitle: 'Search Holdings',
            heading: 'Search Holdings',
            breadcrumbs: [
              {
                text: 'Home',
                href: '/'
              },
              {
                text: 'Search Holdings'
              }
            ],
            errors,
            values: request.payload,
            errorSummary
          }).takeover()
        }
      }
    },
    handler: searchForHoldingByCph
  }
}

export const viewHoldingController = {
  get: {
    handler: getViewHolding
  }
}
