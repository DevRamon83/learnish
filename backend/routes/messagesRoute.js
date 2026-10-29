import express from "express";
import validateNewContact from "../middlewares/validateNewContact.js";
import newContactRequest from "../controllers/newContactRequest.js";

const messagesRoute = express.Router();

messagesRoute.post("/newContact", validateNewContact, newContactRequest);

export default messagesRoute;
