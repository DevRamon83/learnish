import mongoose from "mongoose";
const Schema = mongoose.Schema;

const aiLogSchema = new Schema(
  {
    word: { type: String, required: true },
    aiFailed: {
      type: String,
      enum: ["pollinations", "mistral", "groq"],
      required: true,
    },
    missingFields: { type: [String] },
    errorType: { type: String },
    errorMsg: { type: String },
  },
  { timestamps: true },
);

const aiLogModel = mongoose.model("AiLog", aiLogSchema);

export default aiLogModel;
