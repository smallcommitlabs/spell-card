import React from 'react';
import { renderRoutes, routeMap } from './routeMapper';

const LazyGame = React.lazy(() => import('../pages/Game'));
const LazyLogin = React.lazy(() => import('../pages/Login'));

const mainRouteMap: routeMap = {
  routes: [
    {
      path: '/spellcard',
      Component: LazyGame,
      exact: true,
    },
    {
      path: '/',
      Component: LazyLogin,
      exact: false,
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
