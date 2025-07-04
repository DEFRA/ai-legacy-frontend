import { cphSearchController } from '../cph-search/controller.js'

/**
 * Sets up the routes used in the home page.
 * Now serves the CPH search functionality as the main landing page.
 * These routes are registered in src/server/router.js.
 */

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const home = {
  plugin: {
    name: 'home',
    register (server) {
      server.route([
        {
          method: 'GET',
          path: '/',
          ...cphSearchController
        }
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
