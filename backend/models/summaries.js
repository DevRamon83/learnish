import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SummarySchema = new Schema(
  {
    original: { type: String, required: true },
    ai: { type: String, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

SummarySchema.index({ owner: 1 });

const summaryModel = mongoose.model("Summary", SummarySchema, "summaries");

export default summaryModel;
