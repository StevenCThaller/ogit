import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import {
  createUser,
  findUserByUsername,
  findUserByUsernameOrEmail,
} from "../services/auth.services";
import { signJwt } from "../utils/auth.utils";
import { jwt_secret } from "../config/auth.config";
import { AuthRequest, IUser } from "../types/types";
import { INVALID_USER_ERROR } from "../constants";
import { getUserById } from "../services/user.services";

type UserValidationError = {
  error: {
    [key: string]: string;
  };
};

export const handleRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body;

    const userExists: IUser | null = await findUserByUsernameOrEmail(
      username,
      email
    );

    if (userExists) {
      const isUsername: boolean =
        userExists.username.toLowerCase() === username.toLowerCase;
      const errorObj: UserValidationError = { error: {} };
      if (isUsername) errorObj.error.username = "Username already in use.";
      else errorObj.error.email = "Email already in use.";

      return res.status(422).json(errorObj);
    }

    await createUser(username, email, password);

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export const handleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;

    const candidateUser: IUser | null = await findUserByUsername(username);

    const passwordMatches =
      candidateUser &&
      (await bcrypt.compare(password, candidateUser.passwordHash!));

    if (!passwordMatches)
      return res
        .status(422)
        .json({ error: { username: "Invalid username and/or password." } });

    const token: string = signJwt(candidateUser, jwt_secret);

    res.status(200).json({ token, user: candidateUser.toJSON() });
  } catch (error) {
    next(error);
  }
};

export const handleGetUserInfo = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const { _id } = req.user;

    if (!_id.equals(userId)) throw INVALID_USER_ERROR;
    const user = await getUserById(_id);

    res.json(user);
  } catch (error) {
    next(error);
  }
};
