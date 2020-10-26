import React from 'react';
import { Helmet } from 'react-helmet';

import { IRoute } from '@libs/core/routes/Routes';
import { appTitle } from './AppConstants';

export default function SEOHandler({ route, children }: ISEOHandler) {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {appTitle} - {route.name}
        </title>
        <meta name="description" content={route.description} />
      </Helmet>
      {children}
    </>
  );
}

interface ISEOHandler {
  route: IRoute;
  children: any;
}
