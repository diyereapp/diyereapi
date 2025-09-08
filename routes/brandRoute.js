// routes/brandRoutes.js
import express from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import AWS from "aws-sdk";
import { createBrand, getBrands } from "../controller/brandController.js";

const router = express.Router();

// AWS S3 setup
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Multer-S3 storage for brand image
const upload = multer({
  storage: multerS3({
    s3,
    bucket: "edupros",
    acl: "public-read", // allow public access to images
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      const fileKey = `brands/${Date.now()}-${file.originalname}`;
      cb(null, fileKey);
    },
  }),
});

// Routes
router.post("/create-brand", upload.single("image"), createBrand);
router.get("/brands", getBrands);

export default router;
