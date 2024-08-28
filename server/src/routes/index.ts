import { Router } from "express";
import filesRouter from "./files.routes";

const router: Router = Router();

router.use("/files", filesRouter);

export default router;
