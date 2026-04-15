import express from "express";
import validateMessage from "../middlewares/validateMessage.js";
import newMessage from "../controllers/newMessage.js";

const messagesRoute = express.Router();

messagesRoute.post("/new", validateMessage, newMessage);

export default messagesRoute;
