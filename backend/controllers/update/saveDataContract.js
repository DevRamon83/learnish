import createTokenConfigs from "../../helpers/token/createTokenConfigs.js";
import setTokenAndCookie from "../../helpers/token/setTokenAndCookie.js";
import { userModel } from "../../models/user.js";

const saveDataContract = async (req, res) => {
  try {
    const data = req.body;
    const userID = req.context.auth.id;
    const user = await userModel.findById(userID);
    const availableServices = ["tutoring", "speaking", "qNa"];

    const fieldArray = Object.keys(data);
    const fieldName = fieldArray[0];

    user.contract[fieldName] = data[fieldName];

    if (availableServices.includes(fieldName)) {
      user.contract[fieldName].available = true;
    }

    if (fieldName === "subscription") {
      user.contract.isComplete = true;
    }

    await user.save();

    return res.status(200).json({ error: false });
  } catch (err) {
    console.error("Error in saveDataContract:", err);
    const log = false;
    return handleErrorResponse(res, req, err.message, 500, log);
  }
};

export default saveDataContract;
