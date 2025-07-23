import { createHoldingController, viewHoldingController } from './controller.js'

/**
 * Sets up the routes used for holdings management.
 * These routes are registered in src/server/router.js.
 */
export const holdings = {
  plugin: {
    name: 'holdings',
    register(server) {
      server.route([
        {
          method: 'GET',
          path: '/holdings/create',
          ...createHoldingController.get
        },
        {
          method: 'POST',
          path: '/holdings/create',
          ...createHoldingController.post
        },
        {
          method: 'GET',
          path: '/holdings/{cph}',
          ...viewHoldingController.get
        }
      ])
    }
  }
}
