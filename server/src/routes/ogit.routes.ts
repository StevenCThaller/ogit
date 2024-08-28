import { Router } from "express";
import {
  handleCreatePost,
  handleGetPosts,
} from "../controllers/ogitPost.controller";
import { requireAuth } from "../middleware/auth.middleware";
import {
  validateCreatePost,
  validateGetPosts,
} from "../middleware/ogitPosts.middleware";

const router: Router = Router();

router
  .route("/")
  /**
   * Get all posts near user's current location
   */
  .get(/*requireAuth, */ validateGetPosts, handleGetPosts)
  /**
   * Create a new post
   */
  .post(requireAuth, validateCreatePost, handleCreatePost);

router
  .route("/:postId")
  /**
   * Get a specific post
   */
  .get()
  /**
   * Edit a post (i.e. edit image or caption)
   */
  .put()
  /**
   * Delete a post - make sure it also deletes from AWS
   */
  .delete();

export default router;
