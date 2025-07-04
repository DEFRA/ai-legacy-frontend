import { getHandler } from './get.js'

export const holdingTasks = {
  plugin: {
    name: 'holding-tasks',
    register: async (server) => {
      server.route([
        {
          method: 'GET',
          path: '/holding/{cph}/tasks',
          ...getHandler
        }
      ])
    }
  }
}
