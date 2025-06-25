/**
 * TBCMS DRFS controller.
 * @satisfies {Partial<ServerRoute>}
 */
export const tbDrfsController = {
  handler(request, h) {
    try {
      return h.view('tbcase-drfs/drfs', {
        pageTitle: 'DRFS - Disease Reporting Forms',
        heading: 'DRFS - Disease Reporting Forms',
        caption: 'TBCMS'
      })
    } catch (error) {
      request.logger.error('Error loading DRFS page:', error)

      return h.view('tbcase-drfs/drfs', {
        pageTitle: 'DRFS - Disease Reporting Forms',
        heading: 'DRFS - Disease Reporting Forms',
        caption: 'TBCMS',
        error: 'Unable to load page. Please try again later.'
      })
    }
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
