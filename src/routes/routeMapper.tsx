import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

export interface routeMap {
  Fallback?: React.ComponentType
  routes?: Array<route>
  redirects?: Array<redirect>
}

export interface route {
  path: string
  exact?: boolean
  Component: React.ComponentType
}

export interface redirect {
  from: string
  to: string
}

const defaultFallback = () => <p>Loading...</p>

export const renderRoutes = ({ Fallback = defaultFallback, routes, redirects }: routeMap) => () => (
  <Suspense fallback={<Fallback />}>
    <Switch>
      {routes?.map(({ path, Component, exact }, i) => (
        <Route path={path} key={i} exact={exact}>
          <Component />
        </Route>
      ))}
      {redirects?.map(({ from, to }, i) => (
        <Redirect from={from} to={to} key={i} />
      ))}
    </Switch>
  </Suspense>
)
