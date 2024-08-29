import { celebrate, Joi, Segments } from "celebrate";
import { MAX_MAP_RADIUS, S3_REGEX } from "../constants";

export const validateGetPosts = celebrate(
  {
    [Segments.QUERY]: Joi.object().keys({
      lat: Joi.number().min(-90).max(90).required().messages({
        "number.base": "Latitude must be a number.",
        "number.min": "Latitude must be within -90 and 90",
        "number.max": "Latitude must be within -90 and 90",
        "any.required": "Latitude is a required field.",
      }),
      lng: Joi.number().min(-180).max(180).required().messages({
        "number.base": "Longitude must be a number.",
        "number.min": "Longitude must be within -180 and 180",
        "number.max": "Longitude must be within -180 and 180",
        "any.required": "Longitude is a required field.",
      }),
      rad: Joi.number().min(0).max(MAX_MAP_RADIUS).required().messages({
        "number.base": "Radius must be a number.",
        "number.min": "Radius must be at least 0.",
        "number.max": "That's too far.",
        "any.required": "Radius is a required field.",
      }),
      userId: Joi.string(),
    }),
  },
  { abortEarly: false }
);

export const validateCreatePost = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      caption: Joi.string().messages({
        "string.base": "Caption needs to be a string.",
      }),
      imgUrl: Joi.string().pattern(S3_REGEX).required().messages({
        "string.base": "Image url must be a string.",
        "string.pattern": "Invalid S3 bucket url.",
        "any.required": "You can't post without a photo.",
      }),
      lat: Joi.number().min(-180).max(180).required().messages({
        "number.base": "Latitude must be a number.",
        "number.min": "Latitude must be within -180 and 180",
        "number.max": "Latitude must be within -180 and 180",
        "any.required": "Latitude is a required field.",
      }),
      lng: Joi.number().min(-180).max(180).required().messages({
        "number.base": "Longitude must be a number.",
        "number.min": "Longitude must be within -180 and 180",
        "number.max": "Longitude must be within -180 and 180",
        "any.required": "Longitude is a required field.",
      }),
    }),
  },
  { abortEarly: false }
);
