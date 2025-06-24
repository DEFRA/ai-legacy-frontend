/**
 * TBCMS TB Case Tracings controller.
 * @satisfies {Partial<ServerRoute>}
 */
export const tbCaseTracingsController = {
  handler(_request, h) {
    return h.view('tbcase-tracings/tracings', {
      pageTitle: 'Tracings',
      heading: 'Tracings',
      caption: 'TB Case Form',
      activePage: 'tracings'
    })
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
