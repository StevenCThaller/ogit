import { Router } from "express";
import {
  handleCreatePost,
  handleDeletePost,
  handleGetPostById,
  handleGetPosts,
  handleUpdatePost,
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
  .get(validateGetPosts, handleGetPosts)
  /**
   * Create a new post
   */
  .post(requireAuth, validateCreatePost, handleCreatePost);

router
  .route("/:postId")
  /**
   * Get a specific post
   */
  .get(handleGetPostById)
  /**
   * Edit a post (i.e. edit image or caption)
   */
  .put(requireAuth, handleUpdatePost)
  /**
   * Delete a post - make sure it also deletes from AWS
   */
  .delete(requireAuth, handleDeletePost);

export default router;
