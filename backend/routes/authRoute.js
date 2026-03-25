import express from "express";
import dataStandard from "../middlewares/dataStandard.js";
import singupValidator from "../middlewares/auth/singupValidator.js";
import createUser from "../controllers/auth/createUser.js";

const authRoute = express.Router();

authRoute.post("/signup", dataStandard, singupValidator, createUser);

export default authRoute;
