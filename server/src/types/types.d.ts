import { Request } from "express";

type AuthRequest = Request & {
  user?: any;
};
