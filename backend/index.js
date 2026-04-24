import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import authRoute from "./routes/authRoute.js";
import { userModel } from "./models/user.js";
import { setPopulator } from "./utils/atomicUtils.js";
import dashboardRoute from "./routes/dashboardRoute.js";
import messagesRoute from "./routes/messagesRoute.js";
import generateFlashcard from "./helpers/ai/generateFlashcard.js";

const app = express();

const env = process.env.NODE_ENV;
const ORIGIN = env === "DEV" ? process.env.ORIGIN_DEV : process.env.ORIGIN_PROD;
const MONGO_URI = process.env[`MONGO_URI_${env}`];
const PORT = process.env.PORT || 4000;

const tokensRevoked = new Set();
const usersBanned = new Set();

// Low-latency security cache. Using native Sets instead of an external Redis
// instance to avoid network overhead and stay within zero-budget constraints.
const securityCache = {
  tokensRevoked,
  usersBanned,
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

app.use(express.json({ limit: "10kb" }));

app.use(cookieParser());
app.set("securityCache", securityCache);

app.use("/api/auth", authRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/messages", messagesRoute);

mongoose
  .connect(MONGO_URI)

  .then(async () => {
    const unauthorizedUsers = await userModel.find(
      { $or: [{ isRevoked: true }, { isBanned: true }] },
      "username isRevoked isBanned",
    );
    setPopulator(unauthorizedUsers, tokensRevoked, usersBanned);
    generateFlashcard("home");
    app.listen(PORT, () => {
      env === "DEV" && console.log("server running on port ", PORT);
    });
  })
  .catch((error) => {
    console.error(error.message);
  });
