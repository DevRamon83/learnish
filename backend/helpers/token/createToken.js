import jwt from "jsonwebtoken";

const createToken = (username, id, expiresIn) => {
  const payload = {
    username,
    id,
  };

  return jwt.sign(payload, process.env.SECRET, { expiresIn });
};

export default createToken;
