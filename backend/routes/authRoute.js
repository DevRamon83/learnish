import express from "express";
import dataStandard from "../middlewares/dataStandard.js";
import singupValidator from "../middlewares/auth/singupValidator.js";
import createUser from "../controllers/auth/createUser.js";
import login from "../controllers/auth/login.js";
import check from "../controllers/auth/check.js";
import tokensValidator from "../middlewares/auth/tokensValidator.js";
import logout from "../controllers/auth/logout.js";

const authRoute = express.Router();

authRoute.post("/signup", dataStandard, singupValidator, createUser);
authRoute.post("/login", dataStandard, singupValidator, login);
authRoute.post("/check", dataStandard, tokensValidator, check);
authRoute.post("/logout", dataStandard, tokensValidator, logout);

export default authRoute;
