import { userModel } from "../models/user.js";

const banUser = async (username, req) => {
  try {
    req.context.usersBanned.add(username);
    await userModel.findOneAndUpdate(
      { username },
      { $set: { isBanned: true } },
    );
  } catch (err) {
    console.error(err);
  }
};

export default banUser;
