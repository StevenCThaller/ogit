import { Schema, model } from "mongoose";
import { S3_REGEX } from "../constants";
import { IOgitPost } from "../types/types";

const ogitPostSchema = new Schema<IOgitPost>(
  {
    caption: {
      type: String,
      required: false,
    },
    imgUrl: {
      type: String,
      required: true,
      match: S3_REGEX,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    poster: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);
ogitPostSchema.index({ location: "2dsphere" });

const OgitPost = model<IOgitPost>("OgitPost", ogitPostSchema);

export default OgitPost;
