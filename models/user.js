import { Schema, model } from "mongoose";

import { handleSaveError, handelUpdateValidate } from "./hooks.js";

import { emailPegexp } from "../constants/user-constants.js";

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    match: emailPegexp,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    minLength: 6,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: String,
  avatarURL: String,
}, { versionKey: false })

userSchema.pre("findOneAndUpdate", handelUpdateValidate)

userSchema.post("save", handleSaveError)
userSchema.post("findOneAndUpdate", handleSaveError)

const User = model("user", userSchema);

export default User;