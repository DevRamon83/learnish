import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SummarySchema = new Schema(
  {
    title: { type: String, required: true },
    channel: { type: String, required: true },
    thumbnail: { type: String, required: true },
    videoID: { type: String, required: true },
    summary: { type: String, required: true },
    isDraft: { type: Boolean, required: true },
    aiText: { type: String },
    mistakes: {
      type: [
        {
          error: String,
          correction: String,
          explain: String,
          errorCode: String,
        },
      ],
    },
    score: {
      overall: { type: Number },
      cohesion: { type: Number },
      vocabulary: { type: Number },
      grammar: { type: Number },
    },
    feedback: { type: String },
    errorCodes: { type: [String] },
    shared: { type: Boolean, required: true },
    misalignment: { type: Boolean, required: true, default: false },
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

SummarySchema.index({ owner: 1, createdAt: -1 });
SummarySchema.index(
  { errorCodes: 1 },
  { partialFilterExpression: { shared: true } },
);

const summaryModel = mongoose.model("Summary", SummarySchema, "summaries");

export default summaryModel;
