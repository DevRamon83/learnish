import { cookieSettings } from "../../constants/atomics.js";
import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import userModel from "../../models/user.js";

const logout = async (req, res) => {
  try {
    const id = req.context.tokens?.payload?.id;
    const { tokensRevoked } = req.context;
    if (!id) return handleErrorResponse(res, req, "invalidPayload", 500);

    const user = await userModel.findByIdAndUpdate(id, { isRevoked: true });
    if (!user) return handleErrorResponse(res, req, "user404", 404);

    const accessCookie = process.env.ACCESS_TOKEN;
    const refreshCookie = process.env.REFRESH_TOKEN;

    res.clearCookie(accessCookie, cookieSettings);
    res.clearCookie(refreshCookie, cookieSettings);
    tokensRevoked.add(user.username);

    const response = { error: false, user: "loggedOut" };
    return res.status(200).json(response);
  } catch (err) {
    console.error("Error in logout:", err);
    const log = false;
    return handleErrorResponse(res, req, err.message, 500, log);
  }
};

export default logout;
