/**
 * TBCMS Cons controller.
 * @satisfies {Partial<ServerRoute>}
 */
export const tbConsController = {
  handler(request, h) {
    try {
      return h.view('tbcase-cons/cons', {
        pageTitle: 'Cons - Conservation',
        heading: 'Cons - Conservation',
        caption: 'TBCMS'
      })
    } catch (error) {
      request.logger.error('Error loading Cons page:', error)

      return h.view('tbcase-cons/cons', {
        pageTitle: 'Cons - Conservation',
        heading: 'Cons - Conservation',
        caption: 'TBCMS',
        error: 'Unable to load page. Please try again later.'
      })
    }
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
