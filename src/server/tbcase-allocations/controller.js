/**
 * TBCMS TB Case Allocations controller.
 * @satisfies {Partial<ServerRoute>}
 */
export const tbCaseAllocationsController = {
  handler(_request, h) {
    return h.view('tbcase-allocations/allocations', {
      pageTitle: 'Allocations',
      heading: 'Allocations',
      caption: 'TB Case Form',
      activePage: 'allocations'
    })
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
