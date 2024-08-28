import { Request, Response, Router } from "express";
import multerS3 from "multer-s3";
import multer from "multer";
import { s3 } from "../config/s3.config";
import path from "path";

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME || "",
    acl: "public-read",
    key: function (req, file, cb) {
      cb(null, `images/${Date.now()}_${path.basename(file.originalname)}`);
    },
  }),
});

const router: Router = Router();

type FileUploadRequest = Request & {
  file?: {
    location?: string;
    [key: string]: any;
  };
};

router.post(
  "/upload",
  upload.single("image"),
  (req: FileUploadRequest, res: Response) => {
    console.log(req.file);
    if (!req.file || !req.file.location) {
      return res.status(400).send("No file uploaded.");
    }

    res.status(200).json({
      message: "File uploaded successfully",
      imgUrl: req.file.location,
    });
  }
);

export default router;
