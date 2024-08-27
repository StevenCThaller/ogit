import { useReducer } from "react";
import { authContext } from "../contexts/authContext";
import { authReducer, initialAuthState } from "../reducers/authReducer";

export type AuthState = {
  isAuthenticated: boolean;
  user: IUser | null;
};

export type AuthAction = { type: "LOGIN"; payload: IUser } | { type: "LOGOUT" };

function ProvideAuth({ children }: React.PropsWithChildren) {
  const [auth, dispatch] = useReducer(authReducer, initialAuthState);

  return (
    <authContext.Provider value={{ auth, dispatch }}>
      {children}
    </authContext.Provider>
  );
}

export default ProvideAuth;
