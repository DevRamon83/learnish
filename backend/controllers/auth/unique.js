import { userModel } from "../../models/user.js";

const unique = async (req, res) => {
  try {
    const { key, value } = req.body;

    const user = await userModel
      .findOne({ [key]: value })
      .select("_id")
      .lean();
    const error = user ? true : false;
    return res.status(200).json({ error });
  } catch (err) {
    console.error(err);
  }
};

export default unique;
