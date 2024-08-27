import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../contexts/authContext";
import { handleSignin, handleSignUp } from "../services/api.services";
import { toast } from "react-toastify";
import { setAuthToken } from "../utils/axios.utils";

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
      toast.success(`Welcome, ${username}!`);
      /**
       * TODO: Navigate somewhere
       */
      navigate(`/${response.user._id}/dashboard`);
    } catch (error) {
      console.log(error);
      toast.error(":(");
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
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = () => {
    dispatch({ type: "LOGOUT" });
  };

  return {
    auth,
    signIn,
    signUp,
    signOut,
  };
};
