import React, { createContext, useContext, useReducer } from 'react';

// TODO Convert this file into a reusable class so it follows DRY better.

/// Interfaces & Enums

/**
 * The structure of the state.
 */
interface IState {
  /** If the navigator should be shown. */
  hidden: boolean;

  sidebarHidden: boolean;
  inlinebarHidden: boolean;

  /** The current page that the navigator recognizes. */
  path: string | null;
}

/**
 * The structure of the JSX props.
 */
interface IProps {
  children: any;
}

/**
 * What the dispatch is allowed to do.
 */
export enum ActionType {
  TOGGLE = 'toggle',
  SIDEBAR = 'sidebar',
  INLINEBAR = 'inlinebar',
  PATH = 'path'
}

interface IAction {
  type: ActionType;
  payload?: string | null;
}

/**
 * The structure for the ContextProvider.
 */
interface IProvider {
  reducer: React.Reducer<IState, IAction>;
  initialState: IState;
  children: any;
}

/// Context

/** This is the context */
export const Context = createContext<[IState, React.Dispatch<IAction>]>(
  // tslint:disable-next-line: no-object-literal-type-assertion
  {} as [IState, React.Dispatch<IAction>]
);

const Provider = ({ reducer, initialState, children }: IProvider) => (
  <Context.Provider value={useReducer(reducer, initialState)}>
    {children}
  </Context.Provider>
);

/** This is what you use to get the value */
export const useNavValue = () => useContext(Context);

/// JSX

/**
 * Context JSX
 */
export function Nav({ children }: IProps) {
  const initialState = {
    hidden: false,
    sidebarHidden: false,
    inlinebarHidden: false,
    path: ''
  };

  const reducer: React.Reducer<IState, IAction> = (state, action) => {
    switch (action.type) {
      case ActionType.TOGGLE:
        return { ...state, hidden: !state.hidden };

      case ActionType.SIDEBAR:
        return { ...state, sidebarHidden: !state.sidebarHidden };

      case ActionType.INLINEBAR:
        return { ...state, inlinebarHidden: !state.inlinebarHidden };

      case ActionType.PATH:
        if (action.payload === undefined) {
          throw new Error('Missing payload in nav reducer.');
        }

        return { ...state, path: action.payload };

      default:
        throw new Error('Invalid nav reducer used.');
    }
  };

  return (
    <Provider initialState={initialState} reducer={reducer}>
      {children}
    </Provider>
  );
}
