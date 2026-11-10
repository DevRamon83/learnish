import express from "express";
import validateNewContact from "../middlewares/validateNewContact.js";
import newContactRequest from "../controllers/messages/newContactRequest.js";
import protectedRoutes from "../middlewares/protectedRoutes.js";
import retrieveMessages from "../controllers/messages/retrieveMessages.js";
import updateMessages from "../controllers/messages/updateMessages.js";
import validateRetrieveMessages from "../middlewares/dashboard/validateRetrieveMessages.js";

const messagesRoute = express.Router();

messagesRoute.post("/newContact", validateNewContact, newContactRequest);

messagesRoute.get(
  "/retrieveMessages",
  ...protectedRoutes,
  validateRetrieveMessages,
  retrieveMessages,
);
messagesRoute.post("/updateMessages", ...protectedRoutes, updateMessages);

export default messagesRoute;
