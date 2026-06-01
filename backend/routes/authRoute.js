import express from "express";
import dataStandard from "../middlewares/dataStandard.js";
import signupValidator from "../middlewares/auth/signupValidator.js";
import createUser from "../controllers/auth/createUser.js";
import login from "../controllers/auth/login.js";
import check from "../controllers/auth/check.js";
import tokensValidator from "../middlewares/auth/tokensValidator.js";
import logout from "../controllers/auth/logout.js";
import unique from "../controllers/auth/unique.js";
import uniqueValidator from "../middlewares/auth/uniqueValidator.js";
import bannedCheck from "../middlewares/auth/bannedCheck.js";
import verifyUser from "../controllers/auth/verifyUser.js";
import forgottenPsw from "../controllers/auth/forgottenPsw.js";
import newPassword from "../controllers/auth/newPassword.js";
import validPsw from "../middlewares/auth/validPsw.js";

const authRoute = express.Router();

authRoute.post("/signup", dataStandard, signupValidator, createUser);
authRoute.post("/login", dataStandard, signupValidator, bannedCheck, login);
authRoute.post("/check", dataStandard, tokensValidator, bannedCheck, check);
authRoute.post("/logout", dataStandard, tokensValidator, logout);
authRoute.post("/unique", dataStandard, uniqueValidator, unique);
authRoute.get("/verify/:token", verifyUser);
authRoute.post("/newPassword/:token", validPsw, newPassword);
authRoute.post("/forgotten", forgottenPsw);

export default authRoute;
