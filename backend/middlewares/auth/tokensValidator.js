import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import tokenChecker from "../../helpers/middleware/tokenChecker.js";

const rtErrorHandler = (data) => {
  const { res, req, errorType, log, userBann } = data;
  if (errorType === "invalidToken") {
    handleErrorResponse(res, req, errorType, 403, true, true);
  } else {
    handleErrorResponse(res, req, errorType, 401, log, userBann);
  }
};

const tokensValidator = async (req, res, next) => {
  let log = true;
  let userBann = true;
  let rotateToken = false;

  const accessToken = await tokenChecker(req, "accessToken");

  if (accessToken.error && accessToken.errorType === "invalidToken") {
    const errorType = accessToken.errorType;
    return handleErrorResponse(res, req, errorType, 403, log, userBann);
  }

  const tokensRevoked = req.context.tokensRevoked;
  const usersBanned = req.context.usersBanned;

  const payload = accessToken.payload;
  if (!payload.username) {
    return handleErrorResponse(res, req, errorType, 404, log, userBann);
  }

  const username = payload.username;

  if (usersBanned.has(username)) {
    const errorType = "userBanned";
    return handleErrorResponse(res, req, errorType, 403, log, userBann);
  }

  if (tokensRevoked.has(username)) {
    log = false;
    userBann = false;
    const errorType = "mustLogged";
    return handleErrorResponse(res, req, errorType, 401, log, userBann);
  }

  if (accessToken.error) {
    rotateToken = true;
  }

  let refreshToken = null;

  if (accessToken.error) {
    refreshToken = await tokenChecker(req, "refreshToken");
  }

  if (refreshToken && refreshToken.error) {
    const errorType = refreshToken.errorType;
    const data = { res, req, errorType, log, userBann };
    return rtErrorHandler(data);
  }

  req.context.tokens.rotate = rotateToken;
  req.context.tokens.payload = payload;
  next();
};

export default tokensValidator;
