import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import { v4 as uuidv4 } from "uuid";
import { userModel } from "../../models/user.js";

const forgottenPsw = async (req, res) => {
  const log = false;
  try {
    const username = req.body.username;

    if (typeof username !== "string") {
      return handleErrorResponse(res, req, "user404", 404, true);
    }

    const user = await userModel.findOne({ username });

    if (!user) {
      return handleErrorResponse(res, req, "user404", 404, log);
    }

    const confirmationToken = uuidv4();

    const env = process.env.NODE_ENV;
    const ORIGIN =
      env === "DEV" ? process.env.ORIGIN_DEV : process.env.ORIGIN_PROD;
    const recoverPsw = ORIGIN + "/recover/" + confirmationToken;

    user.confirmationToken = confirmationToken;
    await user.save();

    return res.status(201).json({ url: recoverPsw, message: "created" });
  } catch (err) {
    console.error("Error in forgottenPsw:", err);
    return handleErrorResponse(res, req, err.message, 500, log);
  }
};

export default forgottenPsw;
