import { Request } from "express";
import { Document } from "mongoose";

type AuthRequest = Request & {
  user?: any;
};

interface UserDocument extends Document, IUser {}
