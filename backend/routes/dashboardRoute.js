import express from "express";
import protectedRouth from "../middlewares/protectedRouth.js";
import newSummary from "../controllers/dashboard/newSummary.js";
import summariesList from "../controllers/dashboard/summariesList.js";
import validateSummary from "../middlewares/dashboard/validateSummary.js";

const dashboardRoute = express.Router();

// need specific validation middleware
dashboardRoute.post(
  "/newSummary",
  validateSummary,
  ...protectedRouth,
  newSummary,
);
dashboardRoute.get("/summariesList", ...protectedRouth, summariesList);

export default dashboardRoute;
