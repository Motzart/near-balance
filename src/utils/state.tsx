import React, { createContext, useReducer } from 'react';
import { IInitialState } from "~state/app";

export interface IState {
  initialState: IInitialState,
  prefix: string
}

type Payload = {
  path: string,
  newState: IState
}

export const State = (initialState: IInitialState, prefix: string) => {
  let updatedState: IInitialState;
  const getState = () => updatedState;
  const store = createContext<IInitialState | null>(initialState);
  const { Provider: InnerProvider } = store;

  const updateState = (state: IInitialState, newState: IInitialState, path = '') => {
    //console.log('updateState', state, path, newState) // debugging
    if (path.length === 0) {
      return { ...state, ...newState };
    }
    const pathArr = path.split('.');
    const first = pathArr[0];
    state = { ...state };
    if (!state[first]) {
      state[first] = {};
    }
    if (pathArr.length === 1) {
      state[first] = !!newState && typeof newState === 'object' && !Array.isArray(newState) ? {
        ...state[first],
        ...newState
      } : newState;
    } else {
      state[first] = {
        ...state[first],
        ...updateState(state[first], newState, pathArr.slice(1).join('.'))
      };
    }

    return state;
  };

  const Provider = ({ children }: {children: React.ReactNode}) => {
    const [state, dispatch] = useReducer((state: IInitialState, payload: Payload) => {
      const { path, newState } = payload;
      if (path === undefined) {
        return state;
      }
      updatedState = updateState(state, newState, path);
      return updatedState;
    }, initialState);

    const update = (path: string, newState): void => {
      dispatch({ path, newState });
    };
    const wrappedDispatch = (fn) => fn({ update, getState, dispatch: wrappedDispatch });

    return <InnerProvider value={{ update, state, dispatch: wrappedDispatch }}>{children}</InnerProvider>;
  };

  if (prefix) {
    return {
      [prefix + 'Store']: store,
      [prefix.substr(0, 1).toUpperCase() + prefix.substr(1) + 'Provider']: Provider,
    };
  }

  return { store, Provider };
};
