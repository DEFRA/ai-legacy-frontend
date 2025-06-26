/**
 * Home page controller for the TB Case Management System
 * Renders the main landing page following GDS design patterns
 * @satisfies {Partial<ServerRoute>}
 */
export const homeController = {
  /**
   * Handler for the home page route
   * @param {object} _request - Hapi request object (unused)
   * @param {object} h - Hapi response toolkit
   * @returns {object} Rendered home page view
   */
  handler(_request, h) {
    return h.view('home/index', {
      pageTitle: 'Home',
      heading: 'Home'
    })
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
