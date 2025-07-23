import Joi from 'joi'

/**
 * Joi schema for creating a new holding
 * Validates all required fields according to DEFRA standards
 */
export const createHoldingSchema = Joi.object({
  // Core Information
  cph: Joi.string()
    .pattern(/^\d{2}\/\d{3}\/\d{4}$/)
    .required()
    .messages({
      'string.pattern.base': 'CPH number must be in the format XX/XXX/XXXX (e.g., 12/345/6789)',
      'any.required': 'CPH number is required'
    }),

  name: Joi.string()
    .max(100)
    .required()
    .messages({
      'string.max': 'Farm name must be 100 characters or less',
      'any.required': 'Farm name is required'
    }),

  description: Joi.string()
    .max(500)
    .allow('')
    .optional()
    .messages({
      'string.max': 'Farm description must be 500 characters or less'
    }),

  // Contact Information
  telephone: Joi.string()
    .pattern(/^(\+44)?0?[1-9]\d{8,10}$/)
    .required()
    .messages({
      'string.pattern.base': 'Enter a valid UK telephone number',
      'any.required': 'Telephone number is required'
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Enter a valid email address',
      'any.required': 'Email address is required'
    }),

  // Address
  street: Joi.string()
    .required()
    .messages({
      'any.required': 'Street address is required'
    }),

  locality: Joi.string()
    .allow('')
    .optional(),

  town: Joi.string()
    .required()
    .messages({
      'any.required': 'Town is required'
    }),

  county: Joi.string()
    .required()
    .messages({
      'any.required': 'County is required'
    }),

  postcode: Joi.string()
    .pattern(/^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/i)
    .required()
    .messages({
      'string.pattern.base': 'Enter a valid UK postcode (e.g., GL7 4AB)',
      'any.required': 'Postcode is required'
    }),

  // Geolocation
  mapRef: Joi.string()
    .required()
    .messages({
      'any.required': 'OS Grid Reference is required'
    }),

  easting: Joi.number()
    .integer()
    .min(0)
    .max(800000)
    .required()
    .messages({
      'number.base': 'Easting must be a number',
      'number.integer': 'Easting must be a whole number',
      'number.min': 'Easting must be between 0 and 800,000',
      'number.max': 'Easting must be between 0 and 800,000',
      'any.required': 'Easting coordinate is required'
    }),

  northing: Joi.number()
    .integer()
    .min(0)
    .max(1400000)
    .required()
    .messages({
      'number.base': 'Northing must be a number',
      'number.integer': 'Northing must be a whole number',
      'number.min': 'Northing must be between 0 and 1,400,000',
      'number.max': 'Northing must be between 0 and 1,400,000',
      'any.required': 'Northing coordinate is required'
    })
})
