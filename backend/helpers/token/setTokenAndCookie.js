import { cookieSettings } from "../../constants/atomics.js";
import createToken from "./createToken.js";

const setTokenAndCookie = async (res, dataConfig) => {
  const { username, id, type, plan, expiresIn } = dataConfig;

  const token = createToken(username, id, type, plan, expiresIn);

  if (dataConfig.maxAge !== null) {
    cookieSettings.maxAge = dataConfig.maxAge;
  }

  res.cookie(dataConfig.tokenName, token, cookieSettings);
};

export default setTokenAndCookie;
