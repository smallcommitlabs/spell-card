import React from 'react'
import { renderRoutes, routeMap } from './routeMapper'

const LazySpellCard = React.lazy(() => import('../components/SpellCard'))

const mainRouteMap: routeMap = {
  routes: [
    {
      path: '/spellcard',
      Component: LazySpellCard,
      exact: true,
    },
  ],

  redirects: [
    {
      from: '/*',
      to: '/spellcard',
    },
  ],
}

export default renderRoutes(mainRouteMap)
