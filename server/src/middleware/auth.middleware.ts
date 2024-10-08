import { celebrate, Joi, Segments } from "celebrate";
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { jwt_secret } from "../config/auth.config";
import { AuthRequest } from "../types/types";
import { User } from "../models";

export const requireAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const auth = req.get("authorization");

  if (!auth) return res.status(401).json({ error: "You must be logged in." });

  const token = auth.replace("Bearer ", "");
  jwt.verify(token, jwt_secret, (err: any, payload: any) => {
    if (err) return res.status(401).json({ error: "You must be logged in." });

    const { sub } = payload;
    User.findById(sub).then((user) => {
      req.user = user;
      next();
    });
  });
};

export const requireAdmin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  if (user.role > 1)
    return res.status(403).json({ error: "Elevated credentials required." });

  next();
};

export const validateRegistration = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      username: Joi.string().min(4).max(16).required().messages({
        "string.empty": "Username is a required field.",
        "string.base": "Username must be a string.",
        "string.min": "Username must be at least 4 characters.",
        "string.max": "Username cannot be longer than 16 characters.",
        "any.required": "Username is a required field.",
      }),
      email: Joi.string().email().required().messages({
        "string.empty": "Email is a required field.",
        "string.base": "Email must be a string.",
        "string.email": "Invalid email address.",
        "any.required": "Email is a required field.",
      }),
      password: Joi.string().min(8).max(24).required().messages({
        "string.empty": "Password is a required field.",
        "string.base": "Password must be a string.",
        "string.min": "Password must be at least 8 characters.",
        "string.max": "Password cannot be longer than 24 characters.",
        "any.required": "Password is a required field.",
      }),
      confirmPassword: Joi.string()
        .required()
        .valid(Joi.ref("password"))
        .messages({
          "string.empty": "Confirm password is a required field.",
          "string.base": "Password confirmation must be a string.",
          "any.required": "You must confirm your password.",
          "any.only": "Passwords must match.",
        }),
    }),
  },
  { abortEarly: false }
);

export const validateLogin = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      username: Joi.string().min(4).max(16).required().messages({
        "string.base": "Username must be a string.",
        "string.empty": "Username is a required field.",
        "string.min": "Username must be at least 4 characters.",
        "string.max": "Username cannot be longer than 16 characters.",
        "any.required": "Username is a required field.",
      }),
      password: Joi.string().min(8).max(24).required().messages({
        "string.base": "Password must be a string.",
        "string.empty": "Password is a required field.",
        "string.min": "Password must be at least 8 characters.",
        "string.max": "Password cannot be longer than 24 characters",
        "any.required": "Password is required.",
      }),
    }),
  },
  { abortEarly: false }
);
