import bcrypt from "bcryptjs";
import { hash_rounds } from "../config/auth.config";
import { User } from "../models";
import { mongooseLowerRegex } from "../utils/mongoose.utils";
import { IUser } from "../types/types";

export const createUser = async (
  username: string,
  email: string,
  password: string
) => {
  const passwordHash: string = await bcrypt.hash(password, hash_rounds);

  const userData = {
    username,
    email,
    passwordHash,
  };

  return await User.create(userData);
};

export const findUserByUsernameOrEmail = async (
  username: string,
  email: string
) => {
  return User.findOne({
    $or: [
      { username: mongooseLowerRegex(username) },
      { email: mongooseLowerRegex(email) },
    ],
  });
};

export const findUserByUsername = async (username: string) => {
  return User.findOne({ username: mongooseLowerRegex(username) });
};

export const findUserByEmail = async (email: string) => {
  return User.findOne({ email: mongooseLowerRegex(email) });
};
