import React from 'react';
import { renderRoutes, routeMap } from './routeMapper';

const LazyGame = React.lazy(() => import('../pages/Game'));

const mainRouteMap: routeMap = {
  routes: [
    {
      path: '/spellcard',
      Component: LazyGame,
      exact: true,
    },
  ],

  redirects: [
    {
      from: '/*',
      to: '/spellcard',
    },
  ],
};

export default renderRoutes(mainRouteMap);
