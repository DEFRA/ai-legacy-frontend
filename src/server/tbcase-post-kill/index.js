import { tbPostKillController } from '~/src/server/tbcase-post-kill/controller.js'

/**
 * Sets up the routes used in the TB case post kill page.
 * These routes are registered in src/server/router.js.
 */

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const tbcasePostKill = {
  plugin: {
    name: 'tbcase-post-kill',
    register(server) {
      server.route([
        {
          method: 'GET',
          path: '/tbcase/post-kill',
          ...tbPostKillController
        }
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
