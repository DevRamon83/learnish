import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import tokenChecker from "../../helpers/middleware/tokenChecker.js";

const rtErrorHandler = (data) => {
  const { res, req, errorType, status } = data;
  let log = false;
  let ipBann = false;
  if (errorType === "invalidToken") {
    log = true;
    ipBann = true;
    handleErrorResponse(res, req, errorType, status, log, ipBann);
  } else {
    handleErrorResponse(res, req, errorType, status, log, ipBann);
  }
};

const tokensValidator = async (req, res, next) => {
  let log = true;
  let ipBann = true;
  let rotateToken = false;

  const accessToken = await tokenChecker(req, "accessToken");
  if (accessToken.error && accessToken.errorType === "invalidToken") {
    const errorType = accessToken.errorType;
    return handleErrorResponse(res, req, errorType, 401, log, ipBann);
  }

  if (accessToken.error) {
    rotateToken = true;
  }

  const refreshToken = await tokenChecker(req, "refreshToken");
  if (refreshToken.error) {
    const errorType = refreshToken.errorType;
    const status = 401;
    const data = { res, req, errorType, status };
    return rtErrorHandler(data);
  }

  req.context.tokens.rotate = rotateToken;
  req.context.tokens.payload = refreshToken.payload;
  next();
};

export default tokensValidator;
