import { messageModel } from "../models/messages.js";
import { userModel } from "../models/user.js";

const idChecker = async (data) => {
  const { userID } = data;
  try {
    await userModel.findById(userID).lean();
    return true;
  } catch (err) {
    return false;
  }
};

const createMessage = async (message) => {
  try {
    const newMessage = await messageModel.create(message);
    return newMessage;
  } catch (err) {
    return null;
  }
};

const workOnDb = async (data, key) => {
  switch (key) {
    case "userExist":
      return await idChecker(data);
    case "newMessage":
      return await createMessage(data);
    default:
      return false;
  }
};

export default workOnDb;
