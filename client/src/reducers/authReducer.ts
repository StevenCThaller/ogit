import { AuthAction, AuthState } from "../providers/ProvideAuth";

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
};

export const authReducer: (
  state: AuthState,
  action: AuthAction
) => AuthState = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN": {
      return {
        isAuthenticated: true,
        user: action.payload,
      };
    }
    case "LOGOUT": {
      return {
        isAuthenticated: false,
        user: null,
      };
    }
    default: {
      return state;
    }
  }
};
