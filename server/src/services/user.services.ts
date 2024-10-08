import { ObjectId } from "mongoose";
import { User } from "../models";

export const getUserById = async (userId: ObjectId | string) =>
  User.findById(userId).populate("posts");

export const addPostToUser = async (userId: string, postId: string) =>
  User.findByIdAndUpdate(userId, { $push: { posts: postId } });

export const deletePostFromUser = async (userId: ObjectId, postId: string) =>
  User.findOneAndUpdate({ _id: userId }, { $pull: { posts: postId } });
