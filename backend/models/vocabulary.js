import mongoose from "mongoose";

const Schema = mongoose.Schema;

const vocabularySchema = new Schema(
  {
    word: { type: String, required: true },
    phrase: { type: String },
    index: { type: Number, required: true },
    type: { type: String, required: true },
    level: { type: String, required: true },
    definition: { type: String },
    flashcard: { type: Boolean, default: false },
    discard: { type: Boolean },
    metadata: {
      storage: { type: String },
      bucketImg: { type: String },
      flashcardFile: { type: String },
      word: {
        bucket: { type: String },
        path: { type: String },
        us: { type: Boolean, required: true, default: false },
        uk: { type: Boolean, required: true, default: false },
        fileName: { type: String },
      },
      phrase: {
        bucket: { type: String },
        path: { type: String },
        us: { type: Boolean, required: true, default: false },
        uk: { type: Boolean, required: true, default: false },
        fileName: { type: String },
      },
    },
    phonetics: {
      us: { type: String, required: true },
      uk: { type: String, required: true },
    },
    translations: {
      italian: { word: { type: String }, phrase: { type: String } },
      spanish: { word: { type: String }, phrase: { type: String } },
      french: { word: { type: String }, phrase: { type: String } },
      portuguese: { word: { type: String }, phrase: { type: String } },
    },
    relations: {
      type: Map,
      of: [Schema.Types.ObjectId],
      default: {},
    },
  },
  { timestamps: true },
);

vocabularySchema.index({ level: 1, type: 1 });
vocabularySchema.index({ createdAt: -1 });
vocabularySchema.index({ flashcard: -1, level: 1, type: 1 });

const vocabularyModel = mongoose.model("Vocabulary", vocabularySchema);

export default vocabularyModel;
