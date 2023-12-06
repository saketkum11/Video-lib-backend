import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
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
export const User = mongoose.model("User", UserSchema);
