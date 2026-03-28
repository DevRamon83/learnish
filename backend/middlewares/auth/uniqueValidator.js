import handleErrorResponse from "../../helpers/handleErrorResponse.js";

const uniqueValidator = (req, res, next) => {
  const { key } = req.body;
  const allowed = ["username", "email"];

  if (!allowed.includes(key)) {
    const log = true;
    const ipBan = true;
    return handleErrorResponse(res, req, "invalidCheck", 400, log, ipBan);
  }

  next();
};

export default uniqueValidator;
