import mongoose from "mongoose";
const Schema = mongoose.Schema;

const LogSchema = new Schema(
  {
    userID: { type: String },
    ip: { type: String },
    method: { type: String },
    url: { type: String },
    errorType: { type: String },
    userAgent: { type: String },
  },
  { timestamps: true },
);

const logModel = mongoose.model("Log", LogSchema);

export default logModel;
