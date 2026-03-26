import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import authValidator from "../../services/validators/authValidator.js";

const singupValidator = (req, res, next) => {
  const data = req.body;
  const log = true;
  const ipBann = true;
  const errorMsg = "error_noData_signup";

  if (!data) {
    return handleErrorResponse(res, req, errorMsg, 400, log, ipBann);
  }

  const invalidData = authValidator(req.path, data);

  if (invalidData) {
    const log = true;
    return handleErrorResponse(res, req, invalidData, 400, log, ipBann);
  }

  next();
};

export default singupValidator;
