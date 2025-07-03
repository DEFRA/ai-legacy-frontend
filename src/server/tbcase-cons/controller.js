/**
 * TBCMS TB Case Cons controller.
 * @satisfies {Partial<ServerRoute>}
 */
export const tbConsController = {
  handler (_request, h) {
    return h.view('tbcase-cons/cons', {
      pageTitle: 'Cons',
      heading: 'Cons',
      caption: 'TB Case Form',
      activePage: 'cons'
    })
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
