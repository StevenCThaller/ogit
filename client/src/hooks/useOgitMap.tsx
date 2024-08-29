/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useReducer } from "react";

/**
 * TODO: types
 */
type OgitMapState = {
  pins: OgitPost[];
  focusedPin: OgitPost | undefined;
};

type OgitMapAction =
  | { type: "FOCUS_PIN"; payload?: string }
  | { type: "LOAD_PINS"; payload: OgitPost[] };

const initialState: OgitMapState = {
  pins: [],
  focusedPin: undefined,
};

const reducer: (state: OgitMapState, action: OgitMapAction) => OgitMapState = (
  state: OgitMapState,
  action: OgitMapAction
) => {
  switch (action.type) {
    case "FOCUS_PIN": {
      console.log(state.pins);
      return {
        ...state,
        focusedPin:
          state.pins.find((post) => post._id === action.payload) || undefined,
      };
    }
    case "LOAD_PINS": {
      return {
        ...state,
        pins: action.payload,
      };
    }
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

export const useOgitMap = () => {
  const { state, dispatch } = useProvideOgitMap();

  const focusPin = (pinId?: string) =>
    dispatch({ type: "FOCUS_PIN", payload: pinId });

  const loadPins = (pins: OgitPost[]) =>
    dispatch({ type: "LOAD_PINS", payload: pins });

  return {
    ogitState: state,
    focusPin,
    loadPins,
  };
};
