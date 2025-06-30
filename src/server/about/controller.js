/**
 * About page controller for the TB Case Management System
 * Renders the about page with breadcrumb navigation following GDS design patterns
 * @satisfies {Partial<ServerRoute>}
 */
export const aboutController = {
  /**
   * Handler for the about page route
   * @param {object} _request - Hapi request object (unused)
   * @param {object} h - Hapi response toolkit
   * @returns {object} Rendered about page view with breadcrumbs
   */
  handler (_request, h) {
    return h.view('about/index', {
      pageTitle: 'About',
      heading: 'About',
      breadcrumbs: [
        {
          text: 'Home',
          href: '/'
        },
        {
          text: 'About'
        }
      ]
    })
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
