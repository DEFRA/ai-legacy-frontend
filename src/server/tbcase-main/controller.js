/**
 * TBCMS TB Case Form controller.
 * @satisfies {Partial<ServerRoute>}
 */
export const tbCaseController = {
  handler(_request, h) {
    return h.view('tbcase-main/index', {
      pageTitle: 'TB Case Form',
      heading: 'TB Case Form',
      caption: 'Exeter Reactor Removals - Landing Page'
    })
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
