/**
 * TBCMS GIS controller.
 * @satisfies {Partial<ServerRoute>}
 */
export const tbGisController = {
  handler(request, h) {
    try {
      return h.view('tbcase-gis/gis', {
        pageTitle: 'GIS - Geographic Information System',
        heading: 'GIS - Geographic Information System',
        caption: 'TBCMS'
      })
    } catch (error) {
      request.logger.error('Error loading GIS page:', error)

      return h.view('tbcase-gis/gis', {
        pageTitle: 'GIS - Geographic Information System',
        heading: 'GIS - Geographic Information System',
        caption: 'TBCMS',
        error: 'Unable to load page. Please try again later.'
      })
    }
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
