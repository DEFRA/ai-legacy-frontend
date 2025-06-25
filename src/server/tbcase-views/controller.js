/**
 * TBCMS Views controller.
 * @satisfies {Partial<ServerRoute>}
 */
export const tbViewsController = {
  handler(request, h) {
    try {
      return h.view('tbcase-views/views', {
        pageTitle: 'Views - TB Case Views',
        heading: 'Views - TB Case Views',
        caseReference: request.query.caseRef || 'TB2024001'
      })
    } catch (error) {
      request.logger.error('Failed to load TB case views page', error)
      return h.response('Internal Server Error').code(500)
    }
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
