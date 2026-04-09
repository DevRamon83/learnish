import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import createTokenConfigs from "../../helpers/token/createTokenConfigs.js";
import setTokenAndCookie from "../../helpers/token/setTokenAndCookie.js";
import { userModel } from "../../models/user.js";

const verifyUser = async (req, res) => {
  const log = false;
  try {
    const { token } = req.params;
    if (!token) {
      const error = "missing token";
      return handleErrorResponse(res, req, error, 400, log);
    }

    const user = await userModel.findOne({ confirmationToken: token });
    if (!user) {
      const error = "cannot find the user with the current token";
      return handleErrorResponse(res, req, error, 404, log);
    }

    user.isVerified = true;
    user.confirmationToken = undefined;
    await user.save();

    const configData = { username: user.username, id: user._id };
    const { accessConfig, refreshConfig } = createTokenConfigs(configData);

    await setTokenAndCookie(res, accessConfig);

    await setTokenAndCookie(res, refreshConfig);

    const response = { error: false, username: user.username, id: user._id };

    res.status(200).json(response);
  } catch (err) {
    console.error("Error in user verification:", err);
    return handleErrorResponse(res, req, err.message, 500, log);
  }
};

export default verifyUser;
