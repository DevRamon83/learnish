import userModel from "../models/user.js";

const tokenRevoker = async (setter, username) => {
  try {
    setter.add(username);
    await userModel.findOneAndUpdate(
      { username },
      { $set: { isRevoked: true } },
    );
  } catch (err) {
    console.error(err);
  }
};

export default tokenRevoker;
