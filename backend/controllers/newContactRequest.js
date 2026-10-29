import handleErrorResponse from "../helpers/handleErrorResponse.js";
import contactModel from "../models/contact.js";

const newContactRequest = async (req, res) => {
  const log = true;
  try {
    const data = req.body;
    await contactModel.create(data);
    return res.status(201).json({ error: false, message: "created" });
  } catch (err) {
    console.error("Error in newContactRequest:", err);
    return handleErrorResponse(res, req, err.message, 500, log);
  }
};

export default newContactRequest;
