import { ObjectId } from "mongoose";
import { EARTH_RADIUS_RADIANS, INVALID_USER_ERROR } from "../constants";
import OgitPost from "../models/ogitPost.model";
import { s3 } from "../config/s3.config";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { deletePostFromUser } from "./user.services";

export const getPostsAroundLocation = async (
  center: [number, number],
  radiusInMeters: number
) => {
  return OgitPost.find({
    location: {
      $geoWithin: {
        $centerSphere: [center, radiusInMeters / EARTH_RADIUS_RADIANS],
      },
    },
  }).populate("poster");
};

export const getUserPostsAroundLocation = async (
  userId: string | ObjectId,
  center: [number, number],
  radiusInMeters: number
) => {
  return OgitPost.find({
    poster: userId,
    location: {
      $geoWithin: {
        $centerSphere: [center, radiusInMeters / EARTH_RADIUS_RADIANS],
      },
    },
  }).populate("poster");
};

export const getPostById = async (postId: string) => {
  return OgitPost.findById(postId).populate("poster");
};

export const createOgitPost = async (
  userId: string | ObjectId,
  imgUrl: string,
  location: [number, number],
  caption?: string
) => {
  return OgitPost.create({
    poster: userId,
    imgUrl,
    caption,
    location: { type: "Point", coordinates: location },
  });
};

export const deleteOgitPostCaption = async (
  postId: string,
  userId: ObjectId
) => {
  const post = await OgitPost.findById(postId);

  if (!post) return null;
  else if (post.poster.toString() !== userId.toString())
    throw INVALID_USER_ERROR;

  post.caption = "";
  await post.save();
  return post;
};
export const updateOgitPostCaption = async (
  postId: string,
  userId: ObjectId,
  caption: string
) => {
  const post = await OgitPost.findById(postId);

  if (!post) return null;
  else if (post.poster.toString() !== userId.toString())
    throw INVALID_USER_ERROR;

  post.caption = caption;
  await post.save();
  return post;
};

export const deleteOgitPost = async (postId: string, userId: ObjectId) => {
  const post = await OgitPost.findById(postId);

  if (!post) return null;
  else if (post.poster.toString() !== userId.toString())
    throw INVALID_USER_ERROR;

  await OgitPost.findByIdAndDelete(postId);
  await deletePostFromUser(userId, postId);

  const imgKey = post.imgUrl.split("/").slice(-2).join("/");

  if (imgKey) {
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: imgKey,
    };
    const deleteCommand = new DeleteObjectCommand(params);

    s3.send(deleteCommand)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
};
