import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import createTokenConfigs from "../../helpers/token/createTokenConfigs.js";
import setTokenAndCookie from "../../helpers/token/setTokenAndCookie.js";
import { userModel } from "../../models/user.js";

const verifyUser = async (req, res) => {
  const log = false;
  try {
    const { token } = req.params;
    if (!token) {
      console.error("missing token");
      return handleErrorResponse(res, req, err.message, 400, log);
    }

    const user = await userModel.findOne({ confirmationToken: token });
    if (!user) {
      console.error("user not found");
      return handleErrorResponse(res, req, err.message, 404, log);
    }

    const configData = { username: user.username, id: user._id };
    const { accessConfig, refreshConfig } = createTokenConfigs(configData);

    await setTokenAndCookie(res, accessConfig);

    await setTokenAndCookie(res, refreshConfig);

    const response = { error: false, username: user.username, id: user._id };

    res.status(200).json(response);
  } catch (err) {
    console.error("Error in login:", err);
    return handleErrorResponse(res, req, err.message, 500, log);
  }
};

export default verifyUser;
