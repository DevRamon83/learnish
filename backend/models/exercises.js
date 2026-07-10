import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  index: { type: String },
  targetLang: {
    type: String,
    enum: ["english"],
  },
  type: {
    type: String,
    enum: ["multipleChoice"],
  },
  instructions: { type: String },
  instructionsTranslations: {
    italian: { type: String },
    spanish: { type: String },
    french: { type: String },
    portuguese: { type: String },
  },
  question: { type: String },
  options: { type: [String] },
  answer: { type: String },
});

const exerciseModel = mongoose.model("Exercise", ExerciseSchema);

export default exerciseModel;
