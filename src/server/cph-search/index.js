/**
 * Sets up the routes used in the CPH search page.
 * The main CPH search functionality is now served at / (home page).
 * This route redirects to maintain backward compatibility.
 * These routes are registered in src/server/router.js.
 */

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const cphSearch = {
  plugin: {
    name: 'cph-search',
    register (server) {
      server.route([
        {
          method: 'GET',
          path: '/cph-search',
          handler: (request, h) => {
            // Redirect to home page which now serves CPH search
            const queryString = request.url.search || ''
            return h.redirect(`/${queryString}`)
          }
        }
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
