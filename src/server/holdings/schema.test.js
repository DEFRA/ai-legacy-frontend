import { describe, test, expect } from 'vitest'
import { createHoldingSchema } from './schema.js'

describe('Holdings Schema', () => {
  describe('createHoldingSchema', () => {
    test('Should validate a valid holding object', () => {
      const validHolding = {
        cph: '12/345/6789',
        name: 'Test Farm',
        description: 'A test farm',
        telephone: '01234567890',
        email: 'test@example.com',
        street: 'Test Street',
        locality: 'Test Village',
        town: 'Test Town',
        county: 'Test County',
        postcode: 'GL7 4AB',
        mapRef: 'SP123456',
        easting: 123456,
        northing: 654321
      }

      const { error } = createHoldingSchema.validate(validHolding)
      expect(error).toBeUndefined()
    })

    test('Should reject invalid CPH format', () => {
      const invalidHolding = {
        cph: 'invalid-format',
        name: 'Test Farm',
        telephone: '01234567890',
        email: 'test@example.com',
        street: 'Test Street',
        town: 'Test Town',
        county: 'Test County',
        postcode: 'GL7 4AB',
        mapRef: 'SP123456',
        easting: 123456,
        northing: 654321
      }

      const { error } = createHoldingSchema.validate(invalidHolding)
      expect(error).toBeDefined()
      expect(error.details[0].message).toContain('CPH number must be in the format XX/XXX/XXXX')
    })

    test('Should reject invalid postcode format', () => {
      const invalidHolding = {
        cph: '12/345/6789',
        name: 'Test Farm',
        telephone: '01234567890',
        email: 'test@example.com',
        street: 'Test Street',
        town: 'Test Town',
        county: 'Test County',
        postcode: 'INVALID',
        mapRef: 'SP123456',
        easting: 123456,
        northing: 654321
      }

      const { error } = createHoldingSchema.validate(invalidHolding)
      expect(error).toBeDefined()
      expect(error.details[0].message).toContain('Enter a valid UK postcode')
    })

    test('Should reject coordinates out of range', () => {
      const invalidHolding = {
        cph: '12/345/6789',
        name: 'Test Farm',
        telephone: '01234567890',
        email: 'test@example.com',
        street: 'Test Street',
        town: 'Test Town',
        county: 'Test County',
        postcode: 'GL7 4AB',
        mapRef: 'SP123456',
        easting: 900000, // Out of range
        northing: 1500000 // Out of range
      }

      const { error } = createHoldingSchema.validate(invalidHolding)
      expect(error).toBeDefined()
      expect(error.details.length).toBeGreaterThan(0)
    })

    test('Should allow optional fields to be empty', () => {
      const holdingWithoutOptionals = {
        cph: '12/345/6789',
        name: 'Test Farm',
        description: '', // Optional
        telephone: '01234567890',
        email: 'test@example.com',
        street: 'Test Street',
        locality: '', // Optional
        town: 'Test Town',
        county: 'Test County',
        postcode: 'GL7 4AB',
        mapRef: 'SP123456',
        easting: 123456,
        northing: 654321
      }

      const { error } = createHoldingSchema.validate(holdingWithoutOptionals)
      expect(error).toBeUndefined()
    })

    test('Should require all mandatory fields', () => {
      const emptyHolding = {}

      const { error } = createHoldingSchema.validate(emptyHolding)
      expect(error).toBeDefined()
      expect(error.details.length).toBeGreaterThan(8) // Should have multiple validation errors
    })
  })
})
