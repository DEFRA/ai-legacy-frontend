import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'

describe('#tbcaseConsController', () => {
  /** @type {Server} */
  let server

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  test('Should provide expected response', async () => {
    const { result, statusCode } = await server.inject({
      method: 'GET',
      url: '/tbcase/cons'
    })

    expect(result).toEqual(expect.stringContaining('Cons'))
    expect(result).toEqual(expect.stringContaining('TB Case Form'))
    expect(statusCode).toBe(statusCodes.ok)
  })

  test('Should include form fields', async () => {
    const { result } = await server.inject({
      method: 'GET',
      url: '/tbcase/cons'
    })

    expect(result).toEqual(expect.stringContaining('Test Scheduling'))
    expect(result).toEqual(expect.stringContaining('testing status'))
  })

  test('Should include tools section', async () => {
    const { result } = await server.inject({
      method: 'GET',
      url: '/tbcase/cons'
    })

    expect(result).toEqual(expect.stringContaining('Tools'))
  })

  test('Should include close form button', async () => {
    const { result } = await server.inject({
      method: 'GET',
      url: '/tbcase/cons'
    })

    expect(result).toEqual(expect.stringContaining('Close form'))
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
