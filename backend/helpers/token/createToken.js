import jwt from "jsonwebtoken";
import { Buffer } from "buffer";

const createToken = (username, id, type, plan, expiresIn) => {
  const payload = {
    username,
    id,
    type,
    plan,
  };

  const secretBuffer = Buffer.from(process.env.SECRET || "", "utf-8");
  const token = jwt.sign(payload, secretBuffer, { expiresIn });

  secretBuffer.fill(0);

  return token;
};

export default createToken;
