import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import bundle from "shared/index.js";
import authContextPopulator from "../../helpers/middleware/authContextPopulator.js";
const { authValidator } = bundle.validators;

const singupValidator = (req, res, next) => {
  const data = req.body;
  const log = true;
  const userBann = false;
  const errorMsg = "error_noData_signup";

  if (!data) {
    return handleErrorResponse(res, req, errorMsg, 400, log, userBann);
  }

  const validData = authValidator(req.path, data);

  if (validData.error) {
    const msg = validData.errors;
    return handleErrorResponse(res, req, msg, 400, log, userBann);
  }

  if (req.path === "/login") {
    authContextPopulator(req, data.username, "signup");
  }

  next();
};

export default singupValidator;
