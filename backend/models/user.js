import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    userType: {
      type: String,
      enum: ["student", "teacher"],
      required: true,
      default: "student",
    },
    isPremium: { type: Boolean, required: true, default: false },
    discount: { type: String, required: true, default: "free" },
    privacy: { type: String, required: true },
    privacyAccepted: { type: Date, required: true, default: Date.now },
    tos: { type: String, required: true },
    tosAccepted: { type: Date, required: true, default: Date.now },
    isRevoked: { type: Boolean, required: true, default: false },
    isBanned: { type: Boolean, required: true, default: false },
  },
  {
    discriminatorKey: "userType",
    timestamps: true,
  },
);

UserSchema.index({ isRevoked: 1, isBanned: 1 });
const userModel = mongoose.model("User", UserSchema);

const Student = userModel.discriminator(
  "student",
  new Schema({
    shareErrors: { type: Boolean, required: true, default: true },
  }),
);

const Teacher = userModel.discriminator(
  "teacher",
  new Schema({
    freeTrial: { type: Boolean, required: true, default: true },
  }),
);

export { userModel, Student, Teacher };
