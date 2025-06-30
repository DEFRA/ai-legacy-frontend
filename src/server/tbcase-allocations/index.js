import { tbCaseAllocationsController } from '~/src/server/tbcase-allocations/controller.js'

/**
 * Sets up the routes used in the TB case allocations page.
 * These routes are registered in src/server/router.js.
 */

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const tbcaseAllocations = {
  plugin: {
    name: 'tbcase-allocations',
    register (server) {
      server.route([
        {
          method: 'GET',
          path: '/tbcase/allocations',
          ...tbCaseAllocationsController
        }
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
