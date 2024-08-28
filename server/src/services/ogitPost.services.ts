import { ObjectId } from "mongoose";
import { EARTH_RADIUS_RADIANS } from "../constants";
import OgitPost from "../models/ogitPost.model";

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
  });
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
  });
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
