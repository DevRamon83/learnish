import { userModel } from "../models/user.js";

const banUser = async (req, data) => {
  try {
    const user = await userModel.findOneAndUpdate(
      { _id: data.userID },
      { $set: { isBanned: true } },
    );

    req.context.usersBanned.add(user.username);
  } catch (err) {
    console.error(err);
  }
};

export default banUser;
