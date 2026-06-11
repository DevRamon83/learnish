import express from "express";
import protectedRoutes from "../middlewares/protectedRoutes.js";
import prepareProfilePic from "../middlewares/update/prepareProfilePic.js";
import parseProfilePic from "../middlewares/update/parseProfilePic.js";
import saveProfilePic from "../controllers/update/saveProfilePic.js";
import settingsValidator from "../middlewares/update/settingsValidator.js";
import saveSettings from "../controllers/update/saveSettings.js";
import saveNewPassword from "../controllers/update/saveNewPassword.js";

const updateRoute = express.Router();

updateRoute.post(
  "/profilePic",
  ...protectedRoutes,
  parseProfilePic,
  prepareProfilePic,
  saveProfilePic,
);

updateRoute.post(
  "/settings",
  ...protectedRoutes,
  settingsValidator,
  saveSettings,
);

updateRoute.post(
  "/newPassword",
  ...protectedRoutes,
  settingsValidator,
  saveNewPassword,
);

export default updateRoute;
