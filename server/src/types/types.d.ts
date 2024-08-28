import { Request } from "express";
import { Document, Schema } from "mongoose";

type AuthRequest = Request & {
  user?: any;
};

interface IUser extends Document {
  _id?: string;
  username: string;
  email: string;
  passwordHash?: string;
  posts?: [];
  // tokenRotation?: string[];
  // role: number;
  createdAd?: Date;
  updatedAt?: Date;
}

interface IOgitPost extends Document {
  _id?: string;
  caption: string;
  imgUrl: string;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
  poster: Schema.Types.ObjectId;
  lat: number;
  lng: number;
}
