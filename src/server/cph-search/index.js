import Joi from 'joi'
import { cphSearchController } from './controller.js'

/**
 * Custom Joi validation for CPH format (XX/XXX/XXXX)
 */
const cphSchema = Joi.string().custom((value, helpers) => {
  // CPH format: XX/XXX/XXXX - exactly 2 digits, slash, 3 digits, slash, 4 digits
  const parts = value.split('/')
  if (parts.length !== 3) {
    return helpers.error('any.invalid')
  }

  const [first, second, third] = parts
  if (first.length !== 2 || second.length !== 3 || third.length !== 4) {
    return helpers.error('any.invalid')
  }

  // Check each part contains only digits
  if (!/^\d+$/.test(first) || !/^\d+$/.test(second) || !/^\d+$/.test(third)) {
    return helpers.error('any.invalid')
  }

  return value
}).message('CPH number must be in format XX/XXX/XXXX (e.g. 12/123/1234)')

/**
 * Sets up the routes used in the CPH search page.
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
          options: {
            validate: {
              query: Joi.object({
                cph: cphSchema.optional()
              }),
              failAction: async (request, h, error) => {
                const validationError = error.details?.[0]?.message || 'Invalid CPH format'
                return h.view('cph-search/index', {
                  pageTitle: 'Search for Holding',
                  heading: 'Search for Holding',
                  breadcrumbs: [
                    {
                      text: 'Home',
                      href: '/'
                    },
                    {
                      text: 'Search for Holding'
                    }
                  ],
                  cph: request.query?.cph,
                  holding: null,
                  errorMessage: validationError
                }).takeover()
              }
            }
          },
          ...cphSearchController
        }
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
