import _axios from "../utils/axios.utils";
import { toast } from "react-toastify";

export const handleSignUp: ServiceSignUp = async (
  username: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  try {
    await _axios.post("/auth/signup", {
      username,
      email,
      password,
      confirmPassword,
    });
  } catch (error) {
    console.log("wat", error);
  }
};

export const handleSignin: (
  username: string,
  password: string
) => Promise<AuthLoginResponse | void> = async (
  username: string,
  password: string
) => {
  try {
    const response: AuthLoginResponse = await _axios.post("/auth/signin", {
      username,
      password,
    });
    toast.success(`Welcome, ${username}`);
    return response;
  } catch (error) {
    console.log("like, idk", error);
  }
};

export const handleSubmitContactMessage: (
  name: string,
  email: string,
  message: string
) => Promise<void> = async (name: string, email: string, message: string) => {
  try {
    await _axios.post("/contact", { name, email, message });

    toast.success(`Thanks, ${name}! Cody will email you back ASAP.`);
  } catch (error) {
    toast.error("Invalid submission, check the error messages!");

    throw error;
  }
};
