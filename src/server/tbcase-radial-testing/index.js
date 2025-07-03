import { tbRadialTestingController } from './controller.js'

/**
 * Sets up the routes used in the TB case Radial Testing page.
 * These routes are registered in src/server/router.js.
 */

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const tbcaseRadialTesting = {
  plugin: {
    name: 'tbcase-radial-testing',
    register (server) {
      server.route([
        {
          method: 'GET',
          path: '/tbcase/radial-testing',
          ...tbRadialTestingController
        }
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
