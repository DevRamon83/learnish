import express from "express";
import dataStandard from "../middlewares/dataStandard.js";
import singupValidator from "../middlewares/auth/singupValidator.js";
import createUser from "../controllers/auth/createUser.js";
import login from "../controllers/auth/login.js";
import check from "../controllers/auth/check.js";
import tokensValidator from "../middlewares/auth/tokensValidator.js";
import logout from "../controllers/auth/logout.js";
import unique from "../controllers/auth/unique.js";
import uniqueValidator from "../middlewares/auth/uniqueValidator.js";
import bannedCheck from "../middlewares/auth/bannedCheck.js";
import verifyUser from "../controllers/auth/verify.js";

const authRoute = express.Router();

authRoute.post("/signup", dataStandard, singupValidator, createUser);
authRoute.post("/login", dataStandard, singupValidator, bannedCheck, login);
authRoute.post("/check", dataStandard, tokensValidator, bannedCheck, check);
authRoute.post("/logout", dataStandard, tokensValidator, logout);
authRoute.post("/unique", dataStandard, uniqueValidator, unique);
authRoute.get("/verify/:token", verifyUser);

export default authRoute;
