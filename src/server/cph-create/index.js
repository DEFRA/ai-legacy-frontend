import Joi from 'joi'
import { cphCreateController } from './controller.js'

/**
 * Validation schema for CPH creation form
 */
const createHoldingSchema = Joi.object({
  cph: Joi.string()
    .pattern(/^\d{2}\/\d{3}\/\d{4}$/)
    .required()
    .messages({
      'string.pattern.base': 'CPH number must be in format XX/XXX/XXXX (e.g. 12/123/1234)',
      'any.required': 'CPH number is required'
    }),
  name: Joi.string()
    .min(1)
    .max(255)
    .required()
    .messages({
      'string.min': 'Holding name is required',
      'string.max': 'Holding name must be 255 characters or less',
      'any.required': 'Holding name is required'
    }),
  description: Joi.string()
    .max(1000)
    .allow('')
    .optional()
    .messages({
      'string.max': 'Description must be 1000 characters or less'
    }),
  street: Joi.string()
    .max(255)
    .allow('')
    .optional()
    .messages({
      'string.max': 'Street address must be 255 characters or less'
    }),
  locality: Joi.string()
    .max(255)
    .allow('')
    .optional()
    .messages({
      'string.max': 'Locality must be 255 characters or less'
    }),
  town: Joi.string()
    .min(1)
    .max(255)
    .required()
    .messages({
      'string.min': 'Town or city is required',
      'string.max': 'Town or city must be 255 characters or less',
      'any.required': 'Town or city is required'
    }),
  county: Joi.string()
    .min(1)
    .max(255)
    .required()
    .messages({
      'string.min': 'County is required',
      'string.max': 'County must be 255 characters or less',
      'any.required': 'County is required'
    }),
  postcode: Joi.string()
    .min(1)
    .max(10)
    .required()
    .messages({
      'string.min': 'Postcode is required',
      'string.max': 'Postcode must be 10 characters or less',
      'any.required': 'Postcode is required'
    }),
  mapReference: Joi.string()
    .max(50)
    .allow('')
    .optional()
    .messages({
      'string.max': 'Map reference must be 50 characters or less'
    }),
  easting: Joi.number()
    .integer()
    .min(0)
    .max(999999)
    .allow('')
    .optional()
    .messages({
      'number.base': 'Easting must be a number',
      'number.integer': 'Easting must be a whole number',
      'number.min': 'Easting must be 0 or greater',
      'number.max': 'Easting must be 999999 or less'
    }),
  northing: Joi.number()
    .integer()
    .min(0)
    .max(999999)
    .allow('')
    .optional()
    .messages({
      'number.base': 'Northing must be a number',
      'number.integer': 'Northing must be a whole number',
      'number.min': 'Northing must be 0 or greater',
      'number.max': 'Northing must be 999999 or less'
    }),
  landline: Joi.string()
    .allow('')
    .optional(),
  mobile: Joi.string()
    .allow('')
    .optional(),
  email: Joi.string()
    .email()
    .allow('')
    .optional()
    .messages({
      'string.email': 'Enter a valid email address'
    })
})

/**
 * Sets up the routes used in the CPH create page.
 * These routes are registered in src/server/router.js.
 */

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const cphCreate = {
  plugin: {
    name: 'cph-create',
    register (server) {
      server.route([
        {
          method: 'GET',
          path: '/cph-create',
          ...cphCreateController
        },
        {
          method: 'POST',
          path: '/cph-create',
          options: {
            validate: {
              payload: createHoldingSchema,
              failAction: async (request, h, error) => {
                const validationErrors = {}
                const errorMessage = 'Please correct the errors below and try again.'

                // Parse Joi validation errors into a more usable format
                if (error.details) {
                  error.details.forEach(detail => {
                    const path = detail.path.join('.')
                    // Map flat field names to the original nested paths for template compatibility
                    const fieldMap = {
                      'cph': 'details.cph',
                      'name': 'details.name', 
                      'description': 'details.description',
                      'street': 'details.address.street',
                      'locality': 'details.address.locality',
                      'town': 'details.address.town',
                      'county': 'details.address.county',
                      'postcode': 'details.address.postcode',
                      'mapReference': 'details.geolocation.mapReference',
                      'easting': 'details.geolocation.easting',
                      'northing': 'details.geolocation.northing'
                    }
                    const mappedPath = fieldMap[path] || path
                    validationErrors[mappedPath] = detail.message
                  })
                }

                // Transform payload to nested structure for template compatibility
                const transformedPayload = {
                  details: {
                    cph: request.payload.cph,
                    name: request.payload.name,
                    description: request.payload.description,
                    address: {
                      street: request.payload.street,
                      locality: request.payload.locality,
                      town: request.payload.town,
                      county: request.payload.county,
                      postcode: request.payload.postcode
                    },
                    geolocation: {
                      mapReference: request.payload.mapReference,
                      easting: request.payload.easting,
                      northing: request.payload.northing
                    },
                    contacts: []
                  }
                }

                // Add contacts if they exist
                if (request.payload.landline) {
                  transformedPayload.details.contacts.push({ type: 'landline', value: request.payload.landline })
                }
                if (request.payload.mobile) {
                  transformedPayload.details.contacts.push({ type: 'mobile', value: request.payload.mobile })
                }
                if (request.payload.email) {
                  transformedPayload.details.contacts.push({ type: 'email', value: request.payload.email })
                }

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
                  formData: transformedPayload,
                  errors: validationErrors,
                  errorMessage
                }).takeover()
              }
            }
          },
          ...cphCreateController
        }
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
