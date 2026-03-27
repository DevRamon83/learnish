import { cookieSettings } from "../../constants/atomics.js";
import createToken from "./createToken.js";

const setTokenAndCookie = async (res, dataConfig) => {
  const { username, id, expiresIn } = dataConfig;

  const token = createToken(username, id, expiresIn);

  if (dataConfig.maxAge !== null) {
    cookieSettings.maxAge = dataConfig.maxAge;
  }

  res.cookie(dataConfig.tokenName, token, cookieSettings);
};

export default setTokenAndCookie;
