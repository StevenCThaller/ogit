import "dotenv/config";
import path from "path";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import { onServerListen, port } from "./config/app.config";
import mongoose from "mongoose";
import { db_url, onDbConnect, onDbFail } from "./config/db.config";

mongoose.connect(db_url).then(onDbConnect).catch(onDbFail);

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../client/dist")));
  app.all("*", (req: Request, res: Response) =>
    res.sendFile(path.resolve(__dirname, "../../../client/dist/index.html"))
  );
}

app.listen(port, onServerListen);

export default app;
