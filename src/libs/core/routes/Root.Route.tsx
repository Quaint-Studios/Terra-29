import { IRoute } from './Routes';

import Home from '@pages/Home/Home';
import HelloWorld from '@pages/HelloWorld/HelloWorld';

// tslint:disable: object-literal-sort-keys

const RootRoutes: IRoute[] = [
  {
    name: 'Home',
    description: `This website is a wiki for Reia, an open-source oRPG! Explore the lore and game functionality.`,
    path: '/',
    component: Home
  },
  {
    name: 'Hello World',
    description: `Hello world!`,
    path: '/hello-world',
    component: HelloWorld
  },
];

export default RootRoutes;