import checkToken from "../token/checkToken.js";

const tokenChecker = async (req, tokenName) => {
  const cookies = req.cookies;

  if (!cookies || Object.keys(cookies).length === 0) {
    return { error: true, errorType: "404" };
  }

  const tokenKey =
    tokenName === "accessToken"
      ? process.env.ACCESS_TOKEN
      : process.env.REFRESH_TOKEN;

  const token = cookies[tokenKey];

  if (!token) {
    return { error: true, errorType: "404" };
  }

  const { error, payload } = checkToken(token);

  if (error) {
    return { error: true, errorType: payload };
  }

  return { error: false, payload };
};

export default tokenChecker;
