import { tbCaseTracingsController } from '~/src/server/tbcase-tracings/controller.js'

/**
 * Sets up the routes used in the TB case tracings page.
 * These routes are registered in src/server/router.js.
 */

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const tbcaseTracings = {
  plugin: {
    name: 'tbcase-tracings',
    register(server) {
      server.route([
        {
          method: 'GET',
          path: '/tbcase/tracings',
          ...tbCaseTracingsController
        }
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
