import { tbViewsController } from '~/src/server/tbcase-views/controller.js'

/**
 * Sets up the routes used in the TB case views page.
 * These routes are registered in src/server/router.js.
 */

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const tbcaseViews = {
  plugin: {
    name: 'tbcase-views',
    register(server) {
      server.route([
        {
          method: 'GET',
          path: '/tbcase/views',
          ...tbViewsController
        }
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
