import express from "express";
import visionRoutes from "./routes/visionRoutes.js";

import productRoute from "./routes/productRoute.js";

import catRoute from "./routes/catRoute.js";

import passport from "passport";
import "./passport.js";
import session from "express-session";
import noticeRoute from "./routes/noticeRoute.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db2.js";
import cors from "cors";
import MongoStore from "connect-mongo";
import authenticateUser from "./middleware/authMiddleware.js";
import blogRoute from "./routes/blogRoute.js";
import authRoute from "./routes/authRoute.js";
dotenv.config();

const app = express();
connectDB();

// app.use(express.json());
app.use(express.json({ limit: "50gb" }));
app.use(express.urlencoded({ extended: true, limit: "50gb" }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configure CORS
const corsOptions = {
  origin: [
    "http://localhost:3001",
    "http://localhost:3000",
    "http://localhost:5173",
    "https://diyere.vercel.app",
    "https://www.diyere.com",
    "https://lifemirror.org",
    "https://diyere.vercel.app",
    "https://dashboard.diyere.com",
    "https://admin.diyere.com",
  ], // specify your client's URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-API-Key", "X-Api-Key"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(
  session({
    secret: process.env.GOOGLE_CLIENT_SECRET,
    resave: false,
    saveUninitialized: true,

    store: new MongoStore({
      mongoUrl: process.env.MONGODB_URI, // Use `mongoUrl` instead of `url`
      ttl: 14 * 24 * 60 * 60, // 14 days
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "https://blog.zarichtravels.com");
//   res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });
app.use("/api", authRoute);
app.use("/api", visionRoutes);

app.use("/api", productRoute);

app.use("/api", catRoute);

// Use commonRouter with specific routes requiring authentication

// app.use("/api/", commonRoute(s3));

// app.use("/api/", commonRoute(s3));
const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
