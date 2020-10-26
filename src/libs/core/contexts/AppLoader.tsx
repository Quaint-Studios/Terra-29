import React from 'react';

import { useTheme } from '@material-ui/core';
import { useNavValue } from './data/Nav';

import Navigator from '@libs/core/navigator/Navigator';

/**
 * The AppLoader handles preloaded elements
 * that don't belong in the Switch.
 */
export default function AppLoader({children}: any) {
  const [nav] = useNavValue();
  const theme = useTheme();

  document.body.id = theme.palette.type;

  if (!nav.hidden) {
    return <Navigator>{children}</Navigator>;
  }
  return <></>;
}
