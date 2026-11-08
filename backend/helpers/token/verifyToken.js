import jwt from "jsonwebtoken";
import { Buffer } from "buffer";

const errorCondition = (err) => {
  if (err.name === "TokenExpiredError") return { valid: true, expired: true };

  console.log(err);
  return { valid: false, expired: false };
};

const verifyToken = (token) => {
  const secretBuffer = Buffer.from(process.env.SECRET || "", "utf-8");
  try {
    const payload = jwt.verify(token, secretBuffer);

    return { valid: true, expired: false, payload };
  } catch (err) {
    return errorCondition(err);
  } finally {
    secretBuffer.fill(0);
  }
};

export default verifyToken;
