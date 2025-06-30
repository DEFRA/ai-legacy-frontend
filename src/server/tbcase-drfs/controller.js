/**
 * TBCMS TB Case DRFs controller.
 * @satisfies {Partial<ServerRoute>}
 */
export const tbDrfsController = {
  handler(_request, h) {
    return h.view('tbcase-drfs/drfs', {
      pageTitle: 'DRFs',
      heading: 'DRFs',
      caption: 'TB Case Form',
      activePage: 'drfs'
    })
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
