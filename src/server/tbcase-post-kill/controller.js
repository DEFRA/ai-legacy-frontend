/**
 * TBCMS TB Case Post-Kill controller.
 * @satisfies {Partial<ServerRoute>}
 */
export const tbPostKillController = {
  handler(_request, h) {
    return h.view('tbcase-post-kill/post-kill', {
      pageTitle: 'Post-Kill',
      heading: 'Post-Kill',
      caption: 'TB Case Form',
      activePage: 'post-kill'
    })
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
