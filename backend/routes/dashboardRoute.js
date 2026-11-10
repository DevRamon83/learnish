import express from "express";
import newSummary from "../controllers/dashboard/newSummary.js";
import summariesList from "../controllers/dashboard/summariesList.js";
import validateSummary from "../middlewares/dashboard/validateSummary.js";
import aiCorrection from "../controllers/dashboard/aiCorrection.js";
import newStats from "../controllers/dashboard/newStats.js";
import getStats from "../controllers/dashboard/getStats.js";
import protectedRoutes from "../middlewares/protectedRoutes.js";
import flashcards from "../controllers/dashboard/flashcards.js";
import teachersList from "../controllers/dashboard/teachersList.js";
import validateExercise from "../middlewares/dashboard/validateExercise.js";
import newExercise from "../controllers/dashboard/newExercise.js";
import studentData from "../controllers/dashboard/studentData.js";
import createClassroom from "../controllers/dashboard/createClassroom.js";
import validateClassroom from "../middlewares/dashboard/validateClassroom.js";
import changeClassroom from "../controllers/dashboard/changeClassroom.js";

const dashboardRoute = express.Router();

// need specific validation middleware
dashboardRoute.post(
  "/newSummary",
  ...protectedRoutes,
  validateSummary,
  newSummary,
);

dashboardRoute.post("/aiCorrection", ...protectedRoutes, aiCorrection);
dashboardRoute.post("/newStat", ...protectedRoutes, newStats);
dashboardRoute.get("/getStats", ...protectedRoutes, getStats);
dashboardRoute.get("/flashcards", ...protectedRoutes, flashcards);
dashboardRoute.get("/summariesList", ...protectedRoutes, summariesList);
dashboardRoute.get("/teachers", ...protectedRoutes, teachersList);
dashboardRoute.get("/studentData", ...protectedRoutes, studentData);
dashboardRoute.post(
  "/newClassroom",
  ...protectedRoutes,
  validateClassroom,
  createClassroom,
);

dashboardRoute.post("/changeClassroom", ...protectedRoutes, changeClassroom);

dashboardRoute.post(
  "/newExercise",
  ...protectedRoutes,
  validateExercise,
  newExercise,
);

export default dashboardRoute;
