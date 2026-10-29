import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    senderName: { type: String, required: true },
    receiverID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    receiverName: { type: String, required: true },
    content: {
      type: String,
      required: true,
    },
    read: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

messageSchema.index({ senderID: 1, receiverID: 1 });

export const messageModel = mongoose.model("Message", messageSchema);
