import { tbCaseController } from '~/src/server/tbcase/controller.js'

/**
 * Sets up the routes used in the TB case form.
 * These routes are registered in src/server/router.js.
 */

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const tbcase = {
  plugin: {
    name: 'tbcase',
    register(server) {
      server.route([
        {
          method: 'GET',
          path: '/tbcase',
          ...tbCaseController
        },
        {
          method: 'GET',
          path: '/tbcase/case-details',
          handler: (_request, h) => {
            return h.view('tbcase/case-details', {
              pageTitle: 'Case Details',
              heading: 'Case Details',
              caption: 'TB Case Form',
              activePage: 'case-details'
            })
          }
        },
        {
          method: 'GET',
          path: '/tbcase/removals',
          handler: (_request, h) => {
            return h.view('tbcase/removals', {
              pageTitle: 'Removals',
              heading: 'Removals',
              caption: 'TB Case Form',
              activePage: 'removals'
            })
          }
        },
        {
          method: 'GET',
          path: '/tbcase/eartags',
          handler: (_request, h) => {
            return h.view('tbcase/eartags', {
              pageTitle: 'Eartags',
              heading: 'Eartags',
              caption: 'TB Case Form',
              activePage: 'eartags'
            })
          }
        },
        {
          method: 'GET',
          path: '/tbcase/tracings',
          handler: (_request, h) => {
            return h.view('tbcase/tracings', {
              pageTitle: 'Tracings',
              heading: 'Tracings',
              caption: 'TB Case Form',
              activePage: 'tracings'
            })
          }
        },
        {
          method: 'GET',
          path: '/tbcase/allocations',
          handler: (_request, h) => {
            return h.view('tbcase/allocations', {
              pageTitle: 'Allocations',
              heading: 'Allocations',
              caption: 'TB Case Form',
              activePage: 'allocations'
            })
          }
        },
        {
          method: 'GET',
          path: '/tbcase/gis',
          handler: (_request, h) => {
            return h.view('tbcase/gis', {
              pageTitle: 'GIS',
              heading: 'GIS',
              caption: 'TB Case Form',
              activePage: 'gis'
            })
          }
        },
        {
          method: 'GET',
          path: '/tbcase/drfs',
          handler: (_request, h) => {
            return h.view('tbcase/drfs', {
              pageTitle: 'DRFS',
              heading: 'DRFS',
              caption: 'TB Case Form',
              activePage: 'drfs'
            })
          }
        },
        {
          method: 'GET',
          path: '/tbcase/cons',
          handler: (_request, h) => {
            return h.view('tbcase/cons', {
              pageTitle: 'Cons',
              heading: 'Cons',
              caption: 'TB Case Form',
              activePage: 'cons'
            })
          }
        },
        {
          method: 'GET',
          path: '/tbcase/radial-testing',
          handler: (_request, h) => {
            return h.view('tbcase/radial-testing', {
              pageTitle: 'Radial Testing',
              heading: 'Radial Testing',
              caption: 'TB Case Form',
              activePage: 'radial-testing'
            })
          }
        },
        {
          method: 'GET',
          path: '/tbcase/post-kill',
          handler: (_request, h) => {
            return h.view('tbcase/post-kill', {
              pageTitle: 'Post-Kill',
              heading: 'Post-Kill',
              caption: 'TB Case Form',
              activePage: 'post-kill'
            })
          }
        },
        {
          method: 'GET',
          path: '/tbcase/views',
          handler: (_request, h) => {
            return h.view('tbcase/views', {
              pageTitle: 'Views',
              heading: 'Views',
              caption: 'TB Case Form',
              activePage: 'views'
            })
          }
        }
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
