import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    message: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true },
);

const messageModel = mongoose.model("Message", MessageSchema);

export default messageModel;
