import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import createTokenConfigs from "../../helpers/token/createTokenConfigs.js";
import setTokenAndCookie from "../../helpers/token/setTokenAndCookie.js";

const tokensRotation = async (req, res, next) => {
  const needRotation = req.context.tokens.rotate;
  if (!needRotation) {
    next();
    return;
  }
  const log = true;

  const { username, id, type, plan } = req.context.tokens.payload;

  if (!username || !id || !shared) {
    const errorMsg = "invalidPayload";
    return handleErrorResponse(res, req, errorMsg, 404, log);
  }

  const configData = { username, id, type, plan };

  const { accessConfig, refreshConfig } = createTokenConfigs(configData);

  await setTokenAndCookie(res, accessConfig);

  await setTokenAndCookie(res, refreshConfig);

  next();
};

export default tokensRotation;
