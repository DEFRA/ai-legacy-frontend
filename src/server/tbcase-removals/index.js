import {
  tbCaseRemovalsController,
  tbCaseRemovalsPostController
} from './controller.js'

/**
 * Sets up the routes used in the TB case removals page.
 * These routes are registered in src/server/router.js.
 */

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const tbcaseRemovals = {
  plugin: {
    name: 'tbcase-removals',
    register (server) {
      server.route([
        {
          method: 'GET',
          path: '/tbcase/removals',
          ...tbCaseRemovalsController
        },
        {
          method: 'POST',
          path: '/tbcase/removals',
          ...tbCaseRemovalsPostController
        }
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
