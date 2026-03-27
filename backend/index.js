import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import authRoute from "./routes/authRoute.js";
import userModel from "./models/user.js";
import { setPopulator } from "./utils/atomicUtils.js";

const app = express();

const env = process.env.NODE_ENV;
const ORIGIN = env === "DEV" ? process.env.ORIGIN_DEV : process.env.ORIGIN_PROD;
const MONGO_URI = process.env[`MONGO_URI_${env}`];
const PORT = process.env.PORT || 4000;

const tokensRevoked = new Set();
const ipsBanned = new Set();

// Low-latency security cache. Using native Sets instead of an external Redis
// instance to avoid network overhead and stay within zero-budget constraints.
const securityCache = {
  tokensRevoked,
  ipsBanned,
};

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
app.set("securityCache", securityCache);

app.use("/api/auth", authRoute);

mongoose
  .connect(MONGO_URI)

  .then(async () => {
    const revokedUsers = await userModel.find(
      { tokenRevoked: true },
      "username",
    );
    setPopulator(revokedUsers, tokensRevoked, "username");

    app.listen(PORT, () => {
      env === "DEV" && console.log("server running on port ", PORT);
    });
  })
  .catch((error) => {
    console.error(error.message);
  });
