import { Request } from "express";

type AuthRequest = Request & {
  user?: any;
};

interface IUser {
  _id?: string;
  email: string;
  passwordHash?: string;
  // tokenRotation?: string[];
  role: number;
  createdAd?: Date;
  updatedAt?: Date;
}
