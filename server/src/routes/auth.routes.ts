import { Router } from "express";
import { handleLogin, handleRegister } from "../controllers/auth.controller";

const router: Router = Router();

router.post("/signup", handleRegister);
router.post("/signin", handleLogin);

export default router;
