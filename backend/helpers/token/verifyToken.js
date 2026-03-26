import jwt from "jsonwebtoken";

const errorCondition = (err) => {
  if (err.name === "TokenExpiredError") return { valid: true, expired: true };

  console.log(err);
  return { valid: false, expired: false };
};

const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, process.env.SECRET);
    return { valid: true, expired: false, payload };
  } catch (err) {
    return errorCondition(err);
  }
};

export default verifyToken;
