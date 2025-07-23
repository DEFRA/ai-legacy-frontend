import { createHoldingSchema } from './schema.js'

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

/**
 * Mock holding data for demonstration purposes
 * In a real application, this would come from a database
 * @param {string} cph - The CPH number to lookup
 * @returns {Object|null} - The holding data or null if not found
 */
function getMockHoldingData(cph) {
  // Example holding data
  const holdingData = {
    cph: '12/345/6789',
    name: 'Meadowbrook Farm',
    description: 'Mixed dairy and arable farm specializing in Holstein cattle',
    contact: [
      {
        type: 'telephone',
        value: '01234 567890'
      },
      {
        type: 'email',
        value: 'farmer@example.com'
      }
    ],
    address: {
      street: 'Farm Lane',
      locality: 'Little Meadow',
      town: 'Farmington',
      county: 'Gloucestershire',
      postcode: 'GL7 4AB'
    },
    geolocation: {
      mapRef: 'SP123456',
      easting: 412345,
      northing: 267890
    },
    metadata: {
      created: new Date('2024-01-15T10:30:00Z'),
      lastUpdated: new Date('2024-06-20T14:45:00Z'),
      createdBy: 'J. Smith',
      lastUpdatedBy: 'A. Jones'
    }
  }

  // For demo purposes, return the same data regardless of CPH
  // In real implementation, this would query the database
  return cph === holdingData.cph ? holdingData : null
}

export const viewHoldingController = {
  get: {
    handler(request, h) {
      const { cph } = request.params
      
      // Decode the CPH parameter (handle URL encoding of slashes)
      const decodedCph = decodeURIComponent(cph)
      
      // Get holding data (in real app, this would be from database)
      const holdingData = getMockHoldingData(decodedCph)
      
      if (!holdingData) {
        return h.response('Holding not found').code(404)
      }

      // Format contact information for display
      const contacts = {}
      holdingData.contact.forEach(contact => {
        contacts[contact.type] = contact.value
      })

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
        contacts,
        formatDate: (date) => new Date(date).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      })
    }
  }
}
