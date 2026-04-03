import jwt from "jsonwebtoken";

const createToken = (username, id, shared, expiresIn) => {
  const payload = {
    username,
    id,
    shared,
  };

  return jwt.sign(payload, process.env.SECRET, { expiresIn });
};

export default createToken;
