import express from "express";
import protectedRoutes from "../middlewares/protectedRoutes.js";
import prepareProfilePic from "../middlewares/update/prepareProfilePic.js";
import parseProfilePic from "../middlewares/update/parseProfilePic.js";
import saveProfilePic from "../controllers/update/saveProfilePic.js";

const updateRoute = express.Router();

updateRoute.post(
  "/profilePic",
  ...protectedRoutes,
  parseProfilePic,
  prepareProfilePic,
  saveProfilePic,
);

export default updateRoute;
