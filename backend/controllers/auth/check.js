import createTokenConfigs from "../../helpers/token/createTokenConfigs.js";
import setTokenAndCookie from "../../helpers/token/setTokenAndCookie.js";
import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import { userModel } from "../../models/user.js";

const check = async (req, res) => {
  try {
    const { rotate, payload } = req.context.tokens;

    if (rotate) {
      const { accessConfig, refreshConfig } = createTokenConfigs(payload);
      await setTokenAndCookie(res, accessConfig);
      await setTokenAndCookie(res, refreshConfig);
    }

    const user = await userModel.findById(payload.id).lean();

    const response = {
      error: false,
      username: payload.username,
      id: payload.id,
      plan: payload.plan,
      type: payload.type,
      pic: user.profilePic,
    };

    return res.status(200).json(response);
  } catch (err) {
    console.error("Error in check:", err);
    const log = false;
    return handleErrorResponse(res, req, err.message, 500, log);
  }
};

export default check;
