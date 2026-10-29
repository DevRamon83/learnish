import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ContactSchema = new Schema(
  {
    message: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true },
);

const contactModel = mongoose.model("Contact", ContactSchema);

export default contactModel;
