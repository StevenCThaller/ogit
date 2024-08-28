import { useEffect, useReducer } from "react";
import { authContext } from "../contexts/authContext";
import { authReducer, initialAuthState } from "../reducers/authReducer";
import {
  LOCAL_STORAGE_TOKEN_KEY,
  LOCAL_STORAGE_USERID_KEY,
} from "../constants";
import _axios, { setAuthToken } from "../utils/axios.utils";
import { useNavigate } from "react-router-dom";

export type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
};

export type AuthAction = { type: "LOGIN"; payload: User } | { type: "LOGOUT" };

function ProvideAuth({ children }: React.PropsWithChildren) {
  const [auth, dispatch] = useReducer(authReducer, initialAuthState);
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    const savedUserId = localStorage.getItem(LOCAL_STORAGE_USERID_KEY);
    if (savedToken && savedUserId) {
      setAuthToken(savedToken);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      _axios.get(`/auth/${savedUserId}`).then((user: any) => {
        dispatch({
          type: "LOGIN",
          payload: user,
        });
        navigate(`/${user._id}/dashboard`);
      });
    } else {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
      localStorage.removeItem(LOCAL_STORAGE_USERID_KEY);
      navigate("/auth");
    }
  }, []);

  return (
    <authContext.Provider value={{ auth, dispatch }}>
      {children}
    </authContext.Provider>
  );
}

export default ProvideAuth;
