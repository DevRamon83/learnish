import defineModel from "../../helpers/controller/defineModel.js";
import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import isUnique from "../../helpers/isUnique.js";
import { userModel } from "../../models/user.js";
import argon2 from "argon2";
import { v4 as uuidv4 } from "uuid";

const createUser = async (req, res) => {
  try {
    const data = req.body;

    const keys = ["username", "email"];
    const areUnique = await isUnique(userModel, keys, data);

    if (areUnique.error) {
      const errorMsg = areUnique.conflict.join(" - ") + " are duplicated";
      const log = true;
      return handleErrorResponse(res, req, errorMsg, 409, log);
    }

    const password = data.password;
    const hash = await argon2.hash(password);
    const confirmationToken = uuidv4();
    const verifyUrl = process.env.ORIGIN_DEV + "/verify/" + confirmationToken;
    console.log("verifyUrl ", verifyUrl);

    const userObj = {
      username: data.username.trim().toLowerCase(),
      password: hash,
      email: data.email.trim().toLowerCase(),
      privacy: data.privacy,
      tos: data.tos,
      confirmationToken,
    };

    const model = defineModel(data);

    await model.create(userObj);

    return res.status(201).json("created");
  } catch (err) {
    console.error("Error in createUser:", err);
    const log = false;
    return handleErrorResponse(res, req, err.message, 500, log);
  }
};

export default createUser;
