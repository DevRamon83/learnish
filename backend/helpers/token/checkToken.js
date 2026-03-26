import jwt from "jsonwebtoken";
import verifyToken from "./verifyToken.js";

const checkToken = (token) => {
  const isTokenValid = verifyToken(token);
  const payload = jwt.decode(token);

  if (!isTokenValid.valid || isTokenValid.expired) {
    const message = isTokenValid.valid ? "expired" : "invalidToken";
    return { error: true, payload: message };
  }

  return { error: false, payload };
};

export default checkToken;
