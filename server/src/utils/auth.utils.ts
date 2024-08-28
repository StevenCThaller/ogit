import jwt from "jsonwebtoken";
import { Document } from "mongoose";
import { IUser } from "../types/types";

export const signJwt = (user: IUser, secret: string) => {
  const payload = {
    sub: user._id,
    email: user.email,
  };
  return jwt.sign(payload, secret, { expiresIn: "1h" });
};
