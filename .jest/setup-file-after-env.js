import { vi } from 'vitest'

// Globally mock redis in tests
vi.mock('ioredis')
