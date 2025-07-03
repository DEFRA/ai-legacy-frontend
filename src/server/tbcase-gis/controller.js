/**
 * TBCMS TB Case GIS controller.
 * @satisfies {Partial<ServerRoute>}
 */
export const tbGisController = {
  handler (_request, h) {
    return h.view('tbcase-gis/gis', {
      pageTitle: 'GIS',
      heading: 'GIS',
      caption: 'TB Case Form',
      activePage: 'gis'
    })
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
