import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import analyzePayload from "../../helpers/middleware/analyzePayload.js";
import tokenChecker from "../../helpers/middleware/tokenChecker.js";

const rtErrorHandler = (data) => {
  const { res, req, errorType, log, userBan } = data;

  if (errorType === "invalidToken") {
    handleErrorResponse(res, req, errorType, 403, log, userBan);
    return;
  }

  handleErrorResponse(res, req, errorType, 401, false, userBan);
};

const tokensValidator = async (req, res, next) => {
  let log = true;
  const userBan = false;
  let rotateToken = false;

  const accessToken = await tokenChecker(req, "accessToken");

  if (accessToken.error && accessToken.errorType === "invalidToken") {
    const errorType = accessToken.errorType;
    return handleErrorResponse(res, req, errorType, 403, log, userBan);
  }

  const tokensRevoked = req.context.tokensRevoked;

  const accessPayload = analyzePayload(req, accessToken, "at", tokensRevoked);

  if (accessPayload.exit) {
    const errorType = accessPayload.errorType;
    const status = accessPayload.status;
    log = status === 401 ? false : log;
    return handleErrorResponse(res, req, errorType, status, log, userBan);
  }

  // If accessToken is not invalid, then it is expired
  if (accessToken.error) {
    rotateToken = true;
  }

  let refreshToken = null;

  if (accessToken.error) {
    refreshToken = await tokenChecker(req, "refreshToken");
  }

  if (refreshToken && refreshToken.error) {
    const errorType = refreshToken.errorType;
    const data = { res, req, errorType, log, userBan, refreshToken };
    rtErrorHandler(data);
    return;
  }

  // Errors already handled; populate user context if accessToken has expired
  // No need to handle the analyzePayload return
  refreshToken && analyzePayload(req, refreshToken, "rt", tokensRevoked);

  const payload = accessToken.payload || refreshToken.payload;

  req.context.tokens.rotate = rotateToken;
  req.context.tokens.payload = payload;

  next();
};

export default tokensValidator;
