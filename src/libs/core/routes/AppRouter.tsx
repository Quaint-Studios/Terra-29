import React from 'react';
import { Switch } from 'react-router-dom';

import RootRoutes from './Root.Route';
import Routes from './Routes';

export default function () {
  return AppRoutes;
}

export const AppRoutes = (
  <Switch>
    <Routes routes={RootRoutes} />
  </Switch>
);
