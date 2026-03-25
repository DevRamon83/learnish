import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import authValidator from "../../services/validators/authValidator.js";

const singupValidator = (req, res, next) => {
  const data = req.body;

  if (!data) {
    const log = true;
    return handleErrorResponse(res, "error_noData_signup", 400, log);
  }

  const invalidData = authValidator("signup", data);

  if (invalidData) {
    const log = true;
    return handleErrorResponse(res, invalidData, 400, log);
  }

  next();
};

export default singupValidator;
