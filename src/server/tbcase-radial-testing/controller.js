/**
 * TBCMS Radial Testing controller.
 * @satisfies {Partial<ServerRoute>}
 */
export const tbRadialTestingController = {
  handler (request, h) {
    try {
      return h.view('tbcase-radial-testing/radial-testing', {
        pageTitle: 'Radial Testing',
        heading: 'Radial Testing',
        caption: 'TBCMS'
      })
    } catch (error) {
      request.logger.error('Error loading Radial Testing page:', error)

      return h.view('tbcase-radial-testing/radial-testing', {
        pageTitle: 'Radial Testing',
        heading: 'Radial Testing',
        caption: 'TBCMS',
        error: 'Unable to load page. Please try again later.'
      })
    }
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
