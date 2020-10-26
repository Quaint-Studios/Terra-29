import React, { createContext, useContext, useReducer, useState } from 'react';

import { grey } from '@material-ui/core/colors';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import createMixins from '@material-ui/core/styles/createMixins';

interface IThemeStore {
  state: boolean;
  setTheme: (value: boolean) => void;
  setters: React.Dispatch<React.SetStateAction<boolean>>[];
}

export const themeStore: IThemeStore = {
  state: true,
  setTheme(value: boolean) {
    this.state = value;
    this.setters.forEach((setter) => setter(this.state));
  },
  setters: []
};
themeStore.setTheme.bind(themeStore);

/**
 * Context JSX
 */
export function Theme({ children }: any) {
  const [lightMode, setLightMode] = useState(true);

  if (!themeStore.setters.includes(setLightMode)) {
    themeStore.setters.push(setLightMode);
  }

  const baseState = {
    typography: {
      fontFamily: ['"Roboto"', 'sans-serif'].join(',')
    }
  };

  const lightState = createMuiTheme({
    ...baseState,
    palette: {
      type: 'light',
      primary: {
        main: '#ffffff',
        contrastText: '#9e9e9e'
      },
      secondary: {
        light: '#232f3e',
        main: '#1b2430',
        contrastText: '#eeeeee'
      },
      text: {
        primary: '#272727',
        secondary: '#727272' // or #55636b
      }
    },
    overrides: {
      MuiBadge: {
        root: {
          '& .MuiBadge-colorPrimary': {
            color: '#ffffff',
            backgroundColor: '#1976d2'
          }
        }
      }
    }
  });

  const darkState = createMuiTheme({
    ...baseState,
    palette: {
      type: 'dark'
    }
  });

  const initialState = lightMode ? lightState : darkState;

  return <ThemeProvider theme={initialState}>{children}</ThemeProvider>;
}
