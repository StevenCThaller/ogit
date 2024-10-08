import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../contexts/authContext";
import { handleSignin, handleSignUp } from "../services/api.services";
import { toast } from "react-toastify";
import { setAuthToken } from "../utils/axios.utils";
import {
  LOCAL_STORAGE_TOKEN_KEY,
  LOCAL_STORAGE_USERID_KEY,
} from "../constants";

const useProvideAuth = () => useContext(authContext);

export const useAuth = () => {
  const { auth, dispatch } = useProvideAuth();
  const navigate = useNavigate();

  const signIn = async (username: string, password: string) => {
    try {
      const response: AuthLoginResponse | void = await handleSignin(
        username,
        password
      );
      if (!response) throw new Error("Oh no, it all went wrong!");

      setAuthToken(response.token);
      dispatch({ type: "LOGIN", payload: response.user });
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, response.token);
      localStorage.setItem(LOCAL_STORAGE_USERID_KEY, response.user._id);
      toast.success(`Welcome, ${username}!`);
      /**
       * TODO: Navigate somewhere
       */
      navigate(`/${response.user._id}/dashboard`);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Check the errors and try again.");
      throw error;
    }
  };

  const signUp = async (
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    try {
      await handleSignUp(username, email, password, confirmPassword);
      await signIn(username, password);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Check the errors and try again.");
      throw error;
    }
  };

  const signOut = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    localStorage.removeItem(LOCAL_STORAGE_USERID_KEY);
    navigate("/auth");
  };

  return {
    auth,
    signIn,
    signUp,
    signOut,
  };
};
