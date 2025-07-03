import { describe, it, expect } from 'vitest'
import { validateCphFormat } from '~/src/server/common/helpers/validation.js'

describe('validateCphFormat', () => {
  it('should return true for valid CPH format', () => {
    expect(validateCphFormat('12/123/1234')).toBe(true)
    expect(validateCphFormat('01/001/0001')).toBe(true)
    expect(validateCphFormat('99/999/9999')).toBe(true)
  })

  it('should return true for undefined or null values', () => {
    expect(validateCphFormat(undefined)).toBe(true)
    expect(validateCphFormat(null)).toBe(true)
  })

  it('should throw error for non-string values', () => {
    expect(() => validateCphFormat(123)).toThrow('CPH number must be a string')
    expect(() => validateCphFormat({})).toThrow('CPH number must be a string')
    expect(() => validateCphFormat([])).toThrow('CPH number must be a string')
  })

  it('should throw error for incorrect format - wrong number of parts', () => {
    expect(() => validateCphFormat('12/123')).toThrow('CPH number must be in format XX/XXX/XXXX (e.g. 12/123/1234)')
    expect(() => validateCphFormat('12/123/1234/5')).toThrow('CPH number must be in format XX/XXX/XXXX (e.g. 12/123/1234)')
    expect(() => validateCphFormat('121231234')).toThrow('CPH number must be in format XX/XXX/XXXX (e.g. 12/123/1234)')
  })

  it('should throw error for incorrect format - wrong length of parts', () => {
    expect(() => validateCphFormat('1/123/1234')).toThrow('CPH number must be in format XX/XXX/XXXX (e.g. 12/123/1234)')
    expect(() => validateCphFormat('123/123/1234')).toThrow('CPH number must be in format XX/XXX/XXXX (e.g. 12/123/1234)')
    expect(() => validateCphFormat('12/12/1234')).toThrow('CPH number must be in format XX/XXX/XXXX (e.g. 12/123/1234)')
    expect(() => validateCphFormat('12/1234/1234')).toThrow('CPH number must be in format XX/XXX/XXXX (e.g. 12/123/1234)')
    expect(() => validateCphFormat('12/123/123')).toThrow('CPH number must be in format XX/XXX/XXXX (e.g. 12/123/1234)')
    expect(() => validateCphFormat('12/123/12345')).toThrow('CPH number must be in format XX/XXX/XXXX (e.g. 12/123/1234)')
  })

  it('should throw error for non-numeric parts', () => {
    expect(() => validateCphFormat('AB/123/1234')).toThrow('CPH number must be in format XX/XXX/XXXX (e.g. 12/123/1234)')
    expect(() => validateCphFormat('12/ABC/1234')).toThrow('CPH number must be in format XX/XXX/XXXX (e.g. 12/123/1234)')
    expect(() => validateCphFormat('12/123/ABCD')).toThrow('CPH number must be in format XX/XXX/XXXX (e.g. 12/123/1234)')
    expect(() => validateCphFormat('1A/123/1234')).toThrow('CPH number must be in format XX/XXX/XXXX (e.g. 12/123/1234)')
    expect(() => validateCphFormat('12/1A3/1234')).toThrow('CPH number must be in format XX/XXX/XXXX (e.g. 12/123/1234)')
    expect(() => validateCphFormat('12/123/1A34')).toThrow('CPH number must be in format XX/XXX/XXXX (e.g. 12/123/1234)')
  })

  it('should throw error for empty string', () => {
    expect(() => validateCphFormat('')).toThrow('CPH number must be in format XX/XXX/XXXX (e.g. 12/123/1234)')
  })

  it('should throw error for whitespace-only string', () => {
    expect(() => validateCphFormat('   ')).toThrow('CPH number must be in format XX/XXX/XXXX (e.g. 12/123/1234)')
  })
})
