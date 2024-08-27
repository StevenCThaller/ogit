import { createContext } from "react";
import { initialAuthState } from "../reducers/authReducer";

export const authContext = createContext<{
  auth: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}>({
  auth: initialAuthState,
  dispatch: () => null,
});
