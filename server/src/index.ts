import "dotenv/config";
import path from "path";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import { api_url, onServerListen, port } from "./config/app.config";
import mongoose from "mongoose";
import { db_url, onDbConnect, onDbFail } from "./config/db.config";
import router from "./routes";
import {
  invalidUserErrorHandler,
  validationErrorHandler,
} from "./middleware/errors.middleware";

mongoose.connect(db_url).then(onDbConnect).catch(onDbFail);

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(api_url, router);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../client/dist")));
  app.all("*", (req: Request, res: Response) =>
    res.sendFile(path.resolve(__dirname, "../../../client/dist/index.html"))
  );
}

app.use(validationErrorHandler);
app.use(invalidUserErrorHandler);

app.listen(port, onServerListen);

export default app;
