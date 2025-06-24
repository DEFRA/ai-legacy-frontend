/**
 * TBCMS TB Case Details controller.
 * @satisfies {Partial<ServerRoute>}
 */
export const tbCaseDetailsController = {
  handler(_request, h) {
    return h.view('tbcase-case-details/case-details', {
      pageTitle: 'Case Details',
      heading: 'Case Details',
      caption: 'TB Case Form',
      activePage: 'case-details'
    })
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
