import bundle from "shared/index.js";
import handleErrorResponse from "../helpers/handleErrorResponse.js";
const { messageValidator } = bundle.validators;

const validateMessage = (req, res, next) => {
  const log = true;
  const userBan = false;
  const data = req.body;
  const message = messageValidator(data);

  if (message.error) {
    const error = message.errorMsg;
    return handleErrorResponse(res, req, error, 400, log, userBan);
  }

  next();
};

export default validateMessage;
