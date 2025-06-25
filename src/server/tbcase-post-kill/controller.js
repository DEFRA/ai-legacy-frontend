/**
 * TBCMS Post Kill controller.
 * @satisfies {Partial<ServerRoute>}
 */
export const tbPostKillController = {
  handler(request, h) {
    try {
      return h.view('tbcase-post-kill/post-kill', {
        pageTitle: 'Post Kill - TB Case Post Kill',
        heading: 'Post Kill - TB Case Post Kill',
        caseReference: request.query.caseRef || 'TB2024001'
      })
    } catch (error) {
      request.logger.error('Failed to load TB case post kill page', error)
      return h.response('Internal Server Error').code(500)
    }
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
