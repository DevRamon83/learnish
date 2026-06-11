import { userModel } from "../../models/user.js";
import argon2 from "argon2";

const saveNewPassword = async (req, res) => {
  try {
    const data = req.body;
    const userID = req.context.auth.id;
    const user = await userModel.findById(userID);

    const match = await argon2.verify(user.password, data.password);

    if (!match) {
      return handleErrorResponse(res, req, "invalidPsw", 401, log);
    }

    const hash = await argon2.hash(data.newPassword);
    user.password = hash;
    await user.save();

    return res.status(200).json({ error: false });
  } catch (err) {
    console.error("Error in saveNewPassword:", err);
    const log = false;
    return handleErrorResponse(res, req, err.message, 500, log);
  }
};

export default saveNewPassword;
