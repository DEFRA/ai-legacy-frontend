/**
 * TBCMS TB Case Details controller.
 * @satisfies {Partial<ServerRoute>}
 */
export const tbCaseDetailsController = {
  handler(_request, h) {
    return h.view('tbcase-case-details/case-details', {
      pageTitle: 'TB Case Form',
      heading: 'TB Case Form',
      caption: 'Exeter Reactor Removals - Landing Page'
    })
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
