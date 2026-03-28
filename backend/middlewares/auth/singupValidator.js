import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import bundle from "shared/index.js";
const { authValidator } = bundle.validators;

const singupValidator = (req, res, next) => {
  const data = req.body;
  const log = true;
  const ipBann = true;
  const errorMsg = "error_noData_signup";

  if (!data) {
    return handleErrorResponse(res, req, errorMsg, 400, log, ipBann);
  }

  const invalidData = authValidator(req.path, data);

  if (invalidData.error) {
    const log = true;
    return handleErrorResponse(res, req, invalidData, 400, log, ipBann);
  }

  next();
};

export default singupValidator;
