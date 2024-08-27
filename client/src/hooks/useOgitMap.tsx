/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useReducer } from "react";

/**
 * TODO: types
 */
type OgitMapState = {
  myPins: any[];
  friendPins: any[];
  focusedPin: any | null;
};

type OgitMapAction = { type: "" };

const initialState: OgitMapState = {
  myPins: [],
  friendPins: [],
  focusedPin: null,
};

const reducer: (state: OgitMapState, action: OgitMapAction) => OgitMapState = (
  state: OgitMapState,
  action: OgitMapAction
) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

const ogitMapContext = createContext<{
  state: OgitMapState;
  dispatch: React.Dispatch<OgitMapAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const useProvideOgitMap = () => {
  return useContext(ogitMapContext);
};

export const ProvideOgitMap = ({ children }: React.PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ogitMapContext.Provider value={{ state, dispatch }}>
      {children}
    </ogitMapContext.Provider>
  );
};

export const useOgitMap = () => {};
