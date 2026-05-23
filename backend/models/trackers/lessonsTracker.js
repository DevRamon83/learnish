import mongoose from "mongoose";

const Schema = mongoose.Schema;

const LessonSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, index: true },
    nextUnlock: { type: Date },
    unlocked: { type: [String] },
    unlockedToday: { type: Number },
  },
  { timestamps: true },
);

const lessonModel = mongoose.model("Lesson", LessonSchema);

export default lessonModel;
