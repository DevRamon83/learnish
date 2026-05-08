import mongoose from "mongoose";
const Schema = mongoose.Schema;

const pipelineSchema = new Schema(
  {
    word: { type: String, required: true },
    process: {
      type: String,
      enum: ["pollinations", "mistral", "groq", "supabase", "internal"],
      required: true,
    },
    type: {
      type: String,
      enum: ["missing", "failed", "update", "duplicate", "upload"],
      required: true,
    },
    errorMsg: { type: String },
  },
  { timestamps: true },
);

const pipelinesLogModel = mongoose.model("PipelineLog", pipelineSchema);

export default pipelinesLogModel;
