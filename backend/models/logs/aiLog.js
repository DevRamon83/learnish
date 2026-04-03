import mongoose from "mongoose";
const Schema = mongoose.Schema;

const aiLogSchema = new Schema(
  {
    summaryId: { type: mongoose.Schema.Types.ObjectId, required: true },
    msg: { type: String, required: true },
  },
  { timestamps: true },
);

const ailogModel = mongoose.model("AiLog", aiLogSchema);

export default ailogModel;
