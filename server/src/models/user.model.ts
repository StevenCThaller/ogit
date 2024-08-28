import { Schema, model } from "mongoose";
import { EMAIL_REGEX } from "../constants";

export const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      match: EMAIL_REGEX,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    posts: [{ type: Schema.Types.ObjectId, ref: "OgitPost" }],
    // role: {
    //   type: Number,
    //   min: 1,
    //   max: 3,
    //   default: 3,
    // },
    // tokenRotation: {
    //   type: Array<String>
    // }
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret, options) {
        delete ret.passwordHash;
        return ret;
      },
    },
  }
);

const User = model<IUser>("User", userSchema);
export default User;
