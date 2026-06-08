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
    plan: {
      type: String,
      enum: ["free", "basic", "pro"],
      required: true,
      default: "free",
    },
    profilePic: {
      storage: { type: String },
      bucketImg: { type: String },
      fileName: { type: String },
    },
    isVerified: { type: Boolean, required: true, default: false },
    confirmationToken: { type: String },
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
    targetLang: { type: String, enum: ["us", "en"] },
    teacher: { type: Schema.Types.ObjectId },
  }),
);

const Teacher = userModel.discriminator(
  "teacher",
  new Schema({
    freeTrial: { type: Boolean, required: true, default: true },
    taughtLang: { type: String, enum: ["us", "en"] },
    students: [{ type: Schema.Types.ObjectId }],
    contacts: {
      twitter: { type: String },
      instagram: { type: String },
      facebook: { type: String },
      whatsapp: { type: String },
      email: { type: String },
      skype: { type: String },
    },
  }),
);

export { userModel, Student, Teacher };
