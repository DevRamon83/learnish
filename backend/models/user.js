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

const productSchema = new Schema(
  {
    available: { type: Boolean, required: true, default: false },
    single: { type: Number },
    fivePack: { type: Number },
    tenPack: { type: Number },
  },
  { _id: false },
);

const Teacher = userModel.discriminator(
  "teacher",
  new Schema({
    taughtLang: { type: String, enum: ["us", "en"] },
    students: [{ type: Schema.Types.ObjectId }],
    currency: {
      type: String,
      enum: ["dollar", "euro"],
      required: true,
      default: "euro",
    },
    contract: {
      isComplete: { type: Boolean, required: true, default: false },
      subscription: {
        monthly: { type: Number },
        semiannually: { type: Number },
        annually: { type: Number },
      },
      tutoring: productSchema,
      speaking: productSchema,
      qNa: {
        available: { type: Boolean, required: true, default: false },
        price: { type: Number },
      },
    },
  }),
);

export { userModel, Student, Teacher };
