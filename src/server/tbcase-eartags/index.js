import {
  tbCaseEartagsController,
  tbCaseEartagsPostController
} from '~/src/server/tbcase-eartags/controller.js'

/**
 * Sets up the routes used in the TB case eartags page.
 * These routes are registered in src/server/router.js.
 */

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const tbcaseEartags = {
  plugin: {
    name: 'tbcase-eartags',
    register(server) {
      server.route([
        {
          method: 'GET',
          path: '/tbcase/eartags',
          ...tbCaseEartagsController
        },
        {
          method: 'POST',
          path: '/tbcase/eartags',
          ...tbCaseEartagsPostController
        }
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
