import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    senderName: { type: String, required: true },
    receiverID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    receiverName: { type: String, required: true },
    content: {
      type: String,
      required: true,
    },
    chatID: {
      type: [{ type: mongoose.Schema.Types.ObjectId }],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

messageSchema.index({ chatID: 1, createdAt: -1 });

export const messageModel = mongoose.model("Message", messageSchema);
