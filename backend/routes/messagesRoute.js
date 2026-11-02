import express from "express";
import validateNewContact from "../middlewares/validateNewContact.js";
import newContactRequest from "../controllers/newContactRequest.js";
import protectedRoutes from "../middlewares/protectedRoutes.js";
import retrieveMessages from "../controllers/messages/retrieveMessages.js";

const messagesRoute = express.Router();

messagesRoute.post("/newContact", validateNewContact, newContactRequest);
messagesRoute.post("/retrieveMessages", ...protectedRoutes, retrieveMessages);

export default messagesRoute;
