import createToken from "./createToken.js";

const setTokenAndCookie = async (res, dataConfig) => {
  const { username, id, expiresIn } = dataConfig;

  const token = createToken(username, id, expiresIn);

  const cookieConfig = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "prod",
    sameSite: "Strict",
  };

  if (dataConfig.maxAge !== null) {
    cookieConfig.maxAge = dataConfig.maxAge;
  }

  res.cookie(dataConfig.tokenName, token, cookieConfig);
};

export default setTokenAndCookie;
