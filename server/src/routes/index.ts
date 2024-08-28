import { Router } from "express";
import filesRouter from "./files.routes";
import authRouter from "./auth.routes";
import ogitPostsRouter from "./ogit.routes";

const router: Router = Router();

router.use("/auth", authRouter);
router.use("/files", filesRouter);
router.use("/ogit", ogitPostsRouter);

export default router;
