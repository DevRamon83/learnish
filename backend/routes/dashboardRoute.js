import express from "express";
import protectedRouth from "../middlewares/protectedRouth.js";
import newSummary from "../controllers/dashboard/newSummary.js";
import summariesList from "../controllers/dashboard/summariesList.js";

const dashboardRoute = express.Router();

// need specific validation middleware
dashboardRoute.post("/newSummary", ...protectedRouth, newSummary);
dashboardRoute.post("/summariesList", ...protectedRouth, summariesList);

export default dashboardRoute;
