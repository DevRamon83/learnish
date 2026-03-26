import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import isUnique from "../../helpers/isUnique.js";
import userModel from "../../models/user.js";
import argon2 from "argon2";

const createUser = async (req, res) => {
  try {
    const data = req.body;

    const keys = ["username", "email"];
    const areUnique = await isUnique(userModel, keys, data);

    if (areUnique.error) {
      const errorMsg = areUnique.conflict.join(" - ") + " are duplicated";
      const log = false;
      return handleErrorResponse(res, errorMsg, 409, log);
    }

    const password = data.password;
    const hash = await argon2.hash(password);

    const userObj = {
      username: data.username.trim().toLowerCase(),
      password: hash,
      email: data.email.trim().toLowerCase(),
      privacy: data.privacy,
      tos: data.tos,
    };

    await userModel.create(userObj);
    const response = { error: false, msg: "userCreated" };
    return res.status(200).json(response);
  } catch (err) {
    console.error("Error in createUser:", err);
    const log = false;
    return handleErrorResponse(res, err.message, 500, log);
  }
};

export default createUser;
