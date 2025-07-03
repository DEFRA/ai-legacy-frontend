import { tbConsController } from './controller.js'

/**
 * Sets up the routes used in the TB case cons page.
 * These routes are registered in src/server/router.js.
 */

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const tbcaseCons = {
  plugin: {
    name: 'tbcase-cons',
    register (server) {
      server.route([
        {
          method: 'GET',
          path: '/tbcase/cons',
          ...tbConsController
        }
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
