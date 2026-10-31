import express from "express";
import validateNewContact from "../middlewares/validateNewContact.js";
import newContactRequest from "../controllers/newContactRequest.js";
import protectedRoutes from "../middlewares/protectedRoutes.js";
import unreadMessages from "../controllers/messages/unreadMessages.js";

const messagesRoute = express.Router();

messagesRoute.post("/newContact", validateNewContact, newContactRequest);
messagesRoute.get("/unreadMessages", ...protectedRoutes, unreadMessages);

export default messagesRoute;
