import mongoose from "mongoose";

const Schema = mongoose.Schema;

const atomicStats = new Schema({
  day: { type: Number, required: true },
  mongoIDsommary: { type: Schema.Types.ObjectId, required: true },
  words: { type: Number, required: true },
  mistakes: { type: Number, required: true },
  errorTypes: { type: [String], required: true },
});

const StatsSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, index: true },
    year: { type: Number, index: true },
    month: { type: Number, index: true },
    dayStat: [atomicStats],
  },
  { timestamps: true },
);

StatsSchema.index({ userId: 1, year: 1, month: 1 }, { unique: true });

export const Stats = mongoose.model("Stat", StatsSchema);
