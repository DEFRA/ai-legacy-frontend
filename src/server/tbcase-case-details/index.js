import { tbCaseDetailsController } from '~/src/server/tbcase-case-details/controller.js'

/**
 * Sets up the routes used in the TB case details page.
 * These routes are registered in src/server/router.js.
 */

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const tbcaseCaseDetails = {
  plugin: {
    name: 'tbcase-case-details',
    register (server) {
      server.route([
        {
          method: 'GET',
          path: '/tbcase/case-details',
          ...tbCaseDetailsController
        }
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
