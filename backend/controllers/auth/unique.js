import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import userModel from "../../models/user.js";

const unique = async (req, res) => {
  try {
    const { key, value } = req.body;

    const user = await userModel
      .findOne({ [key]: value })
      .select("_id")
      .lean();
    const error = user ? true : false;
    return res.status(200).json({ error });
  } catch (error) {
    console.error(error);
  }
};

export default unique;
