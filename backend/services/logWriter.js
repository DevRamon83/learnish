import logModel from "../models/logs/log.js";

const logWriter = async (data) => {
  try {
    await logModel.create(data);
  } catch (err) {
    console.error(err);
  }
};

export default logWriter;
