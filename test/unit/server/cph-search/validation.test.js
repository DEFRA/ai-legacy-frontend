import { describe, it, expect } from 'vitest'
import Joi from 'joi'

/**
 * Custom Joi validation for CPH format (XX/XXX/XXXX)
 */
const cphSchema = Joi.string().custom((value, helpers) => {
  // CPH format: XX/XXX/XXXX - exactly 2 digits, slash, 3 digits, slash, 4 digits
  const parts = value.split('/')
  if (parts.length !== 3) {
    return helpers.error('any.invalid')
  }

  const [first, second, third] = parts
  if (first.length !== 2 || second.length !== 3 || third.length !== 4) {
    return helpers.error('any.invalid')
  }

  // Check each part contains only digits
  if (!/^\d+$/.test(first) || !/^\d+$/.test(second) || !/^\d+$/.test(third)) {
    return helpers.error('any.invalid')
  }

  return value
}).message('CPH number must be in format XX/XXX/XXXX (e.g. 12/123/1234)')

describe('CPH Validation', () => {
  describe('cphSchema', () => {
    it('should validate correct CPH format', () => {
      const validCphs = ['12/123/1234', '01/001/0001', '99/999/9999']

      validCphs.forEach(cph => {
        const { error } = cphSchema.validate(cph)
        expect(error).toBeUndefined()
      })
    })

    it('should reject invalid CPH format - wrong number of parts', () => {
      const invalidCphs = ['12/123', '12/123/1234/5', '12-123-1234', '12123/1234']

      invalidCphs.forEach(cph => {
        const { error } = cphSchema.validate(cph)
        expect(error).toBeDefined()
        expect(error.message).toBe('CPH number must be in format XX/XXX/XXXX (e.g. 12/123/1234)')
      })
    })

    it('should reject invalid CPH format - wrong length of parts', () => {
      const invalidCphs = ['1/123/1234', '123/123/1234', '12/12/1234', '12/1234/1234', '12/123/123', '12/123/12345']

      invalidCphs.forEach(cph => {
        const { error } = cphSchema.validate(cph)
        expect(error).toBeDefined()
        expect(error.message).toBe('CPH number must be in format XX/XXX/XXXX (e.g. 12/123/1234)')
      })
    })

    it('should reject invalid CPH format - non-numeric characters', () => {
      const invalidCphs = ['AA/123/1234', '12/ABC/1234', '12/123/ABCD', '1A/123/1234', '12/1B3/1234', '12/123/12C4']

      invalidCphs.forEach(cph => {
        const { error } = cphSchema.validate(cph)
        expect(error).toBeDefined()
        expect(error.message).toBe('CPH number must be in format XX/XXX/XXXX (e.g. 12/123/1234)')
      })
    })

    it('should reject empty or null values when provided', () => {
      const invalidValues = ['']

      invalidValues.forEach(value => {
        const { error } = cphSchema.validate(value)
        expect(error).toBeDefined()
      })
    })

    it('should reject non-string values', () => {
      const invalidValues = [123, true, {}, []]

      invalidValues.forEach(value => {
        const { error } = cphSchema.validate(value)
        expect(error).toBeDefined()
      })
    })
  })
})
