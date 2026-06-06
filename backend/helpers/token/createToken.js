import jwt from "jsonwebtoken";

const createToken = (username, id, type, plan, expiresIn) => {
  const payload = {
    username,
    id,
    type,
    plan,
  };

  return jwt.sign(payload, process.env.SECRET, { expiresIn });
};

export default createToken;
