import bundle from "shared";
import handleErrorResponse from "../../helpers/handleErrorResponse.js";
const { passwordValidator } = bundle;

const validPsw = (req, res, next) => {
  const password = req.body.password;
  const { token } = req.params;
  const log = true;

  if (!token) {
    const error = "missingToken";
    return handleErrorResponse(res, req, error, 400, log);
  }

  const isValidData = passwordValidator(password);

  if (isValidData.error) {
    const error = "invalidPsw";
    return handleErrorResponse(res, req, error, 400, log);
  }

  next();
};

export default validPsw;
