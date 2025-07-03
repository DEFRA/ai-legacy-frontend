import { tbGisController } from './controller.js'

/**
 * Sets up the routes used in the TB case GIS page.
 * These routes are registered in src/server/router.js.
 */

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const tbcaseGis = {
  plugin: {
    name: 'tbcase-gis',
    register (server) {
      server.route([
        {
          method: 'GET',
          path: '/tbcase/gis',
          ...tbGisController
        }
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
