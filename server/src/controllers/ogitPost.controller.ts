import { NextFunction, Request, Response } from "express";
import {
  createOgitPost,
  getPostsAroundLocation,
} from "../services/ogitPost.services";
import { AuthRequest } from "../types/types";

interface GetPostsRequest extends Request {
  query: {
    lat: string;
    lng: string;
    rad: string;
  };
}

export const handleGetPosts = async (
  req: GetPostsRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { lat, lng, rad } = req.query;

    const posts = await getPostsAroundLocation(
      [Number(lng), Number(lat)],
      Number(rad)
    );

    res.json(posts);
  } catch (error) {
    next(error);
  }
};

export const handleCreatePost = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id } = req.user;
    const { caption, imgUrl, lat, lng } = req.body;

    const newPost = await createOgitPost(_id, imgUrl, [lng, lat], caption);

    res.json(newPost);
  } catch (error) {
    next(error);
  }
};
