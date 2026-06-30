import createTokenConfigs from "../../helpers/token/createTokenConfigs.js";
import setTokenAndCookie from "../../helpers/token/setTokenAndCookie.js";
import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import { userModel } from "../../models/user.js";
import bundle from "shared";
const { contracts } = bundle.constants;

const saveSettings = async (req, res) => {
  try {
    const data = req.body;
    const userID = req.context.auth.id;
    const user = await userModel.findById(userID);

    const fieldArray = Object.keys(data);
    const fieldName = fieldArray[0];

    if (contracts.includes(fieldName)) {
      const keys = Object.keys(data[fieldName]);
      keys.forEach((key) => {
        user.contract[fieldName][key] = data[fieldName][key];
      });
    } else {
      user[fieldName] = data[fieldName];
    }

    await user.save();

    // Rotate cookies to reflect the updated plan in the JWT payload
    const { payload } = req.context.tokens;
    const updatedPayload = {
      ...payload,
      plan: user.plan,
    };

    const { accessConfig, refreshConfig } = createTokenConfigs(updatedPayload);
    await setTokenAndCookie(res, accessConfig);
    await setTokenAndCookie(res, refreshConfig);

    return res.status(200).json({ error: false });
  } catch (err) {
    console.error("Error in saveSettings:", err);
    const log = false;
    return handleErrorResponse(res, req, err.message, 500, log);
  }
};

export default saveSettings;
