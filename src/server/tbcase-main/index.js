import { tbCaseController } from '~/src/server/tbcase-main/controller.js'

/**
 * Sets up the routes used in the TB case form main page.
 * These routes are registered in src/server/router.js.
 */

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const tbcaseMain = {
  plugin: {
    name: 'tbcase-main',
    register(server) {
      server.route([
        {
          method: 'GET',
          path: '/tbcase',
          ...tbCaseController
        }
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
