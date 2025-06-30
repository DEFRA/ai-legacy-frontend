import inert from '@hapi/inert'

import { health } from '~/src/server/health/index.js'
import { home } from '~/src/server/home/index.js'
import { serveStaticFiles } from '~/src/server/common/helpers/serve-static-files.js'
import { about } from '~/src/server/about/index.js'
import { tbcaseRemovals } from '~/src/server/tbcase-removals/index.js'
import { tbcaseEartags } from '~/src/server/tbcase-eartags/index.js'
import { tbcaseCaseDetails } from '~/src/server/tbcase-case-details/index.js'
import { tbcaseTracings } from '~/src/server/tbcase-tracings/index.js'
import { tbcaseAllocations } from '~/src/server/tbcase-allocations/index.js'
import { tbcaseDrfs } from '~/src/server/tbcase-drfs/index.js'
import { tbcaseViews } from '~/src/server/tbcase-views/index.js'
import { tbcaseCons } from '~/src/server/tbcase-cons/index.js'
import { tbcaseGis } from '~/src/server/tbcase-gis/index.js'
import { tbcaseRadialTesting } from '~/src/server/tbcase-radial-testing/index.js'
import { tbcasePostKill } from '~/src/server/tbcase-post-kill/index.js'

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const router = {
  plugin: {
    name: 'router',
    async register(server) {
      await server.register([inert])

      // Health-check route. Used by platform to check if service is running, do not remove!
      await server.register([health])

      // Application specific routes, add your own routes here
      await server.register([
        home,
        about,
        tbcaseCaseDetails,
        tbcaseRemovals,
        tbcaseEartags,
        tbcaseTracings,
        tbcaseAllocations,
        tbcaseGis,
        tbcaseDrfs,
        tbcaseCons,
        tbcaseRadialTesting,
        tbcasePostKill,
        tbcaseViews
      ])

      // Static assets
      await server.register([serveStaticFiles])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
