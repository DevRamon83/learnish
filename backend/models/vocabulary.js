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
  phrase: {
    example: { type: String, default: false },
    audioUs: { type: Boolean, default: false },
    audioEn: { type: Boolean, default: false },
  },
  translations: {
    word: {
      type: Map,
      of: String,
      default: {},
    },
    phrase: {
      type: Map,
      of: String,
      default: {},
    },
  },
  img: { type: Boolean, default: false },
  pronunciation: {
    audioUs: { type: Boolean, default: false },
    audioEn: { type: Boolean, default: false },
  },
  definition: { type: String },
  relations: {
    type: Map,
    of: [Schema.Types.ObjectId],
    default: {},
  },
});

vocabularySchema.index({ level: 1, type: 1 });

const vocabularyModel = mongoose.model("Vocabulary", vocabularySchema);

export default vocabularyModel;
