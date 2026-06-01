import { userModel } from "../../models/user.js";
import argon2 from "argon2";
import createTokenConfigs from "../../helpers/token/createTokenConfigs.js";
import setTokenAndCookie from "../../helpers/token/setTokenAndCookie.js";
import handleErrorResponse from "../../helpers/handleErrorResponse.js";

const login = async (req, res) => {
  const log = false;

  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });

    if (!user) {
      return handleErrorResponse(res, req, "user404", 404, log);
    }

    if (!user.isVerified) {
      return handleErrorResponse(res, req, "notVerified", 403, log);
    }

    const match = await argon2.verify(user.password, password);

    if (!match) {
      return handleErrorResponse(res, req, "invalidPsw", 401, log);
    }

    const { tokensRevoked } = req.context;
    tokensRevoked.delete(user.username);
    user.isRevoked = false;
    await user.save();

    const configData = {
      username: user.username,
      id: user._id,
      shared: user.shareErrors,
    };
    const { accessConfig, refreshConfig } = createTokenConfigs(configData);

    await setTokenAndCookie(res, accessConfig);

    await setTokenAndCookie(res, refreshConfig);

    const response = { error: false, username: user.username, id: user._id };

    return res.status(200).json(response);
  } catch (err) {
    console.error("Error in login:", err);
    return handleErrorResponse(res, req, err.message, 500, log);
  }
};

export default login;
