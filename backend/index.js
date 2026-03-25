import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import authRoute from "./routes/authRoute.js";

const app = express();

const env = process.env.NODE_ENV;
const ORIGIN = env === "DEV" ? process.env.ORIGIN_DEV : process.env.ORIGIN_PROD;
const MONGO_URI = process.env[`MONGO_URI_${env}`];
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: ORIGIN,
    methods: ["GET", "POST", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  next();
});

app.use(express.json());

app.use(cookieParser());

app.use("/api/auth", authRoute);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      env === "DEV" && console.log("server running on port ", PORT);
    });
  })
  .catch((error) => {
    console.error(error.message);
  });
