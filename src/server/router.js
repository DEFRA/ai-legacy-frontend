import inert from '@hapi/inert'

import { health } from './health/index.js'
import { home } from './home/index.js'
import { serveStaticFiles } from './common/helpers/serve-static-files.js'
import { about } from './about/index.js'
import { tbcaseRemovals } from './tbcase-removals/index.js'
import { tbcaseEartags } from './tbcase-eartags/index.js'
import { tbcaseCaseDetails } from './tbcase-case-details/index.js'
import { tbcaseTracings } from './tbcase-tracings/index.js'
import { tbcaseAllocations } from './tbcase-allocations/index.js'
import { tbcaseDrfs } from './tbcase-drfs/index.js'
import { tbcaseViews } from './tbcase-views/index.js'
import { tbcaseCons } from './tbcase-cons/index.js'
import { tbcaseGis } from './tbcase-gis/index.js'
import { tbcaseRadialTesting } from './tbcase-radial-testing/index.js'
import { tbcasePostKill } from './tbcase-post-kill/index.js'
import { cphSearch } from './cph-search/index.js'
import { cphCreate } from './cph-create/index.js'
import { holdingDetails } from './holding-details/index.js'

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const router = {
  plugin: {
    name: 'router',
    async register (server) {
      await server.register([inert])

      // Health-check route. Used by platform to check if service is running, do not remove!
      await server.register([health])

      // Application specific routes, add your own routes here
      await server.register([
        home,
        about,
        cphSearch,
        cphCreate,
        holdingDetails,
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
