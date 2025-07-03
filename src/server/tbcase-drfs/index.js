import { tbDrfsController } from './controller.js'

/**
 * Sets up the routes used in the TB case DRFS page.
 * These routes are registered in src/server/router.js.
 */

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const tbcaseDrfs = {
  plugin: {
    name: 'tbcase-drfs',
    register (server) {
      server.route([
        {
          method: 'GET',
          path: '/tbcase/drfs',
          ...tbDrfsController
        }
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
