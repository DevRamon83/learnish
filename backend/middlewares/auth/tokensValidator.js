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

// Also used for WebSockets
const tokensValidator = async (req, res, next) => {
  let log = true;
  const userBan = false;
  let rotateToken = false;

  const accessToken = await tokenChecker(req, "accessToken");

  if (accessToken.error && accessToken.errorType === "invalidToken") {
    const errorType = accessToken.errorType;
    return next
      ? handleErrorResponse(res, req, errorType, 403, log, userBan)
      : { error: "invalidToken" };
  }

  const tokensRevoked = req.context.tokensRevoked;

  const accessPayload = analyzePayload(req, accessToken, "at", tokensRevoked);

  if (accessPayload.exit) {
    const errorType = accessPayload.errorType;
    const status = accessPayload.status;
    log = status === 401 ? false : log;
    return next
      ? handleErrorResponse(res, req, errorType, status, log, userBan)
      : { error: "invalidToken" };
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
    next && rtErrorHandler(data);
    return { error: "invalidToken" };
  }

  // Errors already handled; populate user context if accessToken has expired
  // No need to handle the analyzePayload return
  refreshToken && analyzePayload(req, refreshToken, "rt", tokensRevoked);

  const payload = accessToken.payload || refreshToken.payload;

  req.context.tokens.rotate = rotateToken;
  req.context.tokens.payload = payload;

  if (next) {
    next();
  } else {
    return { error: false, payload };
  }
};

export default tokensValidator;
