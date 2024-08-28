import { Router } from "express";
import {
  handleGetUserInfo,
  handleLogin,
  handleRegister,
} from "../controllers/auth.controller";
import {
  requireAuth,
  validateLogin,
  validateRegistration,
} from "../middleware/auth.middleware";

const router: Router = Router();

router.post("/signup", validateRegistration, handleRegister);
router.post("/signin", validateLogin, handleLogin);
router.route("/:userId").get(requireAuth, handleGetUserInfo);

export default router;
