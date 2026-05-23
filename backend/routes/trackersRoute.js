import express from "express";
import protectedRoutes from "../middlewares/protectedRoutes.js";
import unlock from "../controllers/trackers/unlock.js";
import unlocked from "../controllers/trackers/unlocked.js";
import trackerValidation from "../middlewares/trackerValidation.js";

const trackersRoute = express.Router();

trackersRoute.post(
  "/unlockLesson",
  ...protectedRoutes,
  trackerValidation,
  unlock,
);
trackersRoute.get("/unlockedLessons", ...protectedRoutes, unlocked);

export default trackersRoute;
