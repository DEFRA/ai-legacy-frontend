import { describe, test, expect } from 'vitest'
import {
  validateStringParameter,
  validateNumericParameter,
  validateRequiredParameters
} from '../../../../../src/server/common/helpers/validation.js'

describe('Validation helpers', function () {
  describe('validateStringParameter', function () {
    test('should pass for valid string parameters', function () {
      expect(validateStringParameter('valid string', 'testParam')).toBe(true)
      expect(validateStringParameter(undefined, 'testParam')).toBe(true)
    })

    test('should throw error for non-string parameters', function () {
      expect(function () {
        validateStringParameter(123, 'testParam')
      }).toThrow('Invalid testParam parameter: must be a string')
    })

    test('should throw error for empty string parameters', function () {
      expect(function () {
        validateStringParameter('   ', 'testParam')
      }).toThrow('Invalid testParam parameter: cannot be empty')
    })
  })

  describe('validateNumericParameter', function () {
    test('should pass for valid numeric parameters', function () {
      expect(validateNumericParameter(123, 'testParam')).toBe(true)
      expect(validateNumericParameter('456', 'testParam')).toBe(true)
      expect(validateNumericParameter(undefined, 'testParam')).toBe(true)
    })

    test('should throw error for non-numeric parameters', function () {
      expect(function () {
        validateNumericParameter('not-a-number', 'testParam')
      }).toThrow('Invalid testParam parameter: must be a number')
    })
  })

  describe('validateRequiredParameters', function () {
    test('should pass when all required fields are present', function () {
      const params = { field1: 'value1', field2: 'value2' }
      expect(validateRequiredParameters(params, ['field1', 'field2'])).toBe(
        true
      )
    })

    test('should throw error when required fields are missing', function () {
      const params = { field1: 'value1' }
      expect(function () {
        validateRequiredParameters(params, ['field1', 'field2'])
      }).toThrow('Missing required parameters: field2')
    })
  })
})
