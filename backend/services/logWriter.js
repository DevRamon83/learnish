import logModel from "../models/log.js";

const logWriter = async (data) => {
  try {
    await logModel.create(data);
  } catch (err) {
    console.error(err);
  }
};

export default logWriter;
