// Vitest global setup
import { vi } from 'vitest'

// Mock fetch globally for tests
global.fetch = vi.fn()

// Make vi available globally to mimic jest behavior for existing tests
global.jest = vi
