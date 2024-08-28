import { Router } from "express";
import { handleLogin, handleRegister } from "../controllers/auth.controller";
import {
  validateLogin,
  validateRegistration,
} from "../middleware/auth.middleware";

const router: Router = Router();

router.post("/signup", validateRegistration, handleRegister);
router.post("/signin", validateLogin, handleLogin);

export default router;
