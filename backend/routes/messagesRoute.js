import express from "express";
import validateNewContact from "../middlewares/validateNewContact.js";
import newContactRequest from "../controllers/newContactRequest.js";
import protectedRoutes from "../middlewares/protectedRoutes.js";
import AllMessages from "../controllers/messages/allMessages.js";

const messagesRoute = express.Router();

messagesRoute.post("/newContact", validateNewContact, newContactRequest);
messagesRoute.get("/allMessages", ...protectedRoutes, AllMessages);

export default messagesRoute;
