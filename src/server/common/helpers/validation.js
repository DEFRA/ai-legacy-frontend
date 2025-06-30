/**
 * Validation utilities for maintaining JavaScript conventions
 * Provides helper functions for request validation and parameter checking
 */

/**
 * Validates that a string parameter is not empty and is of correct type
 * @param {any} value - The value to validate
 * @param {string} paramName - The name of the parameter for error messages
 * @returns {boolean} True if valid, throws error if invalid
 * @throws {Error} When validation fails
 */
export function validateStringParameter(value, paramName) {
  if (value !== undefined && typeof value !== 'string') {
    throw new Error(`Invalid ${paramName} parameter: must be a string`)
  }

  if (value !== undefined && value.trim() === '') {
    throw new Error(`Invalid ${paramName} parameter: cannot be empty`)
  }

  return true
}

/**
 * Validates that a numeric parameter is a valid number
 * @param {any} value - The value to validate
 * @param {string} paramName - The name of the parameter for error messages
 * @returns {boolean} True if valid, throws error if invalid
 * @throws {Error} When validation fails
 */
export function validateNumericParameter(value, paramName) {
  if (
    value !== undefined &&
    (isNaN(value) || typeof Number(value) !== 'number')
  ) {
    throw new Error(`Invalid ${paramName} parameter: must be a number`)
  }

  return true
}

/**
 * Validates that required parameters are present
 * @param {object} params - Object containing parameters to validate
 * @param {string[]} requiredFields - Array of required field names
 * @returns {boolean} True if all required fields are present
 * @throws {Error} When required fields are missing
 */
export function validateRequiredParameters(params, requiredFields) {
  const missingFields = requiredFields.filter(
    (field) => params[field] === undefined || params[field] === null
  )

  if (missingFields.length > 0) {
    throw new Error(`Missing required parameters: ${missingFields.join(', ')}`)
  }

  return true
}
