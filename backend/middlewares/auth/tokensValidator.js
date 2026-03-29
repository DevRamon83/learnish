import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import authContextPopulator from "../../helpers/middleware/authContextPopulator.js";
import tokenChecker from "../../helpers/middleware/tokenChecker.js";
import tokenRevoker from "../../services/tokenRevoker.js";

const rtErrorHandler = (data, tokensRevoked, username) => {
  const { res, req, errorType, log, userBann } = data;
  if (errorType === "invalidToken") {
    handleErrorResponse(res, req, errorType, 403, log, userBann);
  } else {
    tokenRevoker(tokensRevoked, username);
    handleErrorResponse(res, req, errorType, 401, false, userBann);
  }
};

const tokensValidator = async (req, res, next) => {
  const log = true;
  const userBann = false;
  let rotateToken = false;

  const accessToken = await tokenChecker(req, "accessToken");

  if (accessToken.error && accessToken.errorType === "invalidToken") {
    const errorType = accessToken.errorType;
    return handleErrorResponse(res, req, errorType, 403, log, userBann);
  }

  const tokensRevoked = req.context.tokensRevoked;
  const payload = accessToken.payload;
  const { username, id } = payload;

  const validPayload = authContextPopulator(req, username, id);

  if (validPayload.error) {
    const errorType = validPayload.errorType;
    return handleErrorResponse(res, req, errorType, 404, log, userBann);
  }

  if (tokensRevoked.has(username)) {
    const errorType = "mustLogged";
    return handleErrorResponse(res, req, errorType, 401, false, userBann);
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
    return rtErrorHandler(data, tokensRevoked, username);
  }

  req.context.tokens.rotate = rotateToken;
  req.context.tokens.payload = payload;
  next();
};

export default tokensValidator;
