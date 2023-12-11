import mongoose, { Schema } from "mongoose";
import { Jwt } from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      require: true,
      trim: true,
      index: true,
    },
    coverImage: {
      type: String, // cloudnary
    },
    avatar: {
      type: String, // cloudnary
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    refresToken: {
      type: string,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hash(this.password, 10);
});
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};
export const User = mongoose.model("User", userSchema);
