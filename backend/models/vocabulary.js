import mongoose from "mongoose";

const Schema = mongoose.Schema;

const vocabularySchema = new Schema({
  word: { type: String, required: true, unique: true },
  index: { type: Number, required: true },
  type: { type: String, required: true },
  level: { type: String, required: true },
  phonetics: {
    us: { type: String, required: true },
    uk: { type: String, required: true },
  },
  examples: { type: [String], required: true },
  img: { type: String },
  audio: { type: String },
  definition: { type: String },
});

vocabularySchema.index({ level: 1, type: 1 });

const vocabularyModel = mongoose.model("Vocabulary", vocabularySchema);

export default vocabularyModel;
