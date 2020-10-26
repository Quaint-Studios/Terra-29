import React, { useEffect } from 'react';

import { useNavValue, ActionType as navAction } from './data/Nav';

import { IRoute } from '@libs/core/routes/Routes';
import RoleComponent from './RoleComponent';
import SEOHandler from './SEOHandler';

export default function ContextHandler({ route, children }: IContextHandler) {
  const [nav, navDispatch] = useNavValue();

  useEffect(() => {
    updateAll();

    function updateAll() {
      updateNavigator(); // Updates the nav path and hidden status.
    }

    function updateNavigator() {
      if (
        route.path !== null &&
        route.path !== 'null' &&
        route.path !== nav.path
      ) {
        console.log(route.path, nav.path);
        navDispatch({
          type: navAction.PATH,
          payload: route.path
        });
      }

      if (route.hideNav !== nav.hidden) {
        console.log(route.hideNav, nav.hidden);
        navDispatch({
          type: navAction.TOGGLE
        });
      }

      updateNavItems();
    }

    function updateNavItems() {
      const navItems = document.getElementsByClassName('nav-item');

      Array.from(navItems).forEach((elem) => {
        let href = elem.getAttribute('href');

        if (href === null || href === '#') {
          elem.classList.remove('active');
          return;
        }

        if (elem.getAttribute('href') === nav.path) {
          elem.classList.add('active');
        } else {
          elem.classList.remove('active');
        }
      });
    }
  }, [route, nav, navDispatch]);

  // Render
  if (route.roles !== null) {
    return (
      <SEOHandler route={route}>
        <RoleComponent route={route}>{children}</RoleComponent>
      </SEOHandler>
    );
  }

  return <SEOHandler route={route}>children</SEOHandler>;
}

interface IContextHandler {
  route: IRoute;
  children: any;
}
