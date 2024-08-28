import { NextFunction, Request, Response } from "express";
import {
  createOgitPost,
  deleteOgitPost,
  getPostById,
  getPostsAroundLocation,
  updateOgitPostCaption,
} from "../services/ogitPost.services";
import { AuthRequest } from "../types/types";
import { addPostToUser } from "../services/user.services";

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

export const handleGetPostById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;
    const post = await getPostById(postId);

    res.json(post?.toJSON());
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
    await addPostToUser(_id, newPost._id);

    res.json(newPost);
  } catch (error) {
    next(error);
  }
};

export const handleUpdatePost = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id: userId } = req.user;
    const { postId } = req.params;
    const { caption } = req.body;

    await updateOgitPostCaption(postId, userId, caption);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export const handleDeletePost = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id: userId } = req.user;
    const { postId } = req.params;

    await deleteOgitPost(postId, userId);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};
