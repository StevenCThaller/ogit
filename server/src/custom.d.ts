import "multer";
import { Request } from "express";

declare module "multer" {
  interface File {
    location?: string;
  }
}

declare global {
  namespace Express {
    interface Request {
      file?: {
        lication?: string;
        [key: string]: any;
      };
    }
  }
}
