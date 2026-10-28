import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["multipleChoice", "freeText"],
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    clozeQuestion: {
      type: String,
      required: true,
    },
    answerText: { type: String, required: true },
    answerPosition: { type: Number, required: true },
    multipleWrongs: { type: [String] },
    targetLang: {
      type: String,
      enum: ["english", "spanish", "french", "italian"],
    },
    lessonKey: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId },
    aiGenerated: { type: Boolean },
    isReported: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

ExerciseSchema.index({ targetLang: 1, lessonKey: 1 });

const exerciseModel = mongoose.model("Exercise", ExerciseSchema);

export default exerciseModel;
