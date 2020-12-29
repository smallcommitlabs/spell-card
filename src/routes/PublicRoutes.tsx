import React from 'react';
import { renderRoutes, routeMap } from './routeMapper';

const LazyLogin = React.lazy(() => import('../pages/Login'));

const publicRouteMap: routeMap = {
  routes: [
    {
      path: '/login',
      Component: LazyLogin,
      exact: false,
    },
  ],

  redirects: [
    {
      from: '/*',
      to: '/login',
    },
  ],
};

export default renderRoutes(publicRouteMap);
