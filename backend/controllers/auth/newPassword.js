import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import { userModel } from "../../models/user.js";
import argon2 from "argon2";

const newPassword = async (req, res) => {
  const log = false;

  try {
    const { token } = req.params;
    const password = req.body.password;

    const user = await userModel.findOne({ confirmationToken: token });
    if (!user) {
      const error = "cannot find the user with the current token";
      return handleErrorResponse(res, req, error, 404, log);
    }

    const isTokenExpired = uuidTokenExpired(user, "updatedAt");

    if (isTokenExpired) {
      const error = "expiredToken";
      user.confirmationToken = undefined;
      await user.save();
      return handleErrorResponse(res, req, error, 400, true);
    }

    const hash = await argon2.hash(password);
    user.password = hash;
    user.confirmationToken = undefined;
    await user.save();

    res.status(200).json({ message: "okPassword" });
  } catch (err) {
    console.error("Error in newPassword:", err);
    return handleErrorResponse(res, req, err.message, 500, log);
  }
};

export default newPassword;
