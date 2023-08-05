import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

import gravatar from "gravatar";
import path from "path";
import fs from "fs/promises";
import Jimp from "jimp";

import User from "../models/user.js";

import { ctrlWrapper } from "../decorators/index.js";

import { HttpError } from "../helpers/index.js"

const { JWT_SECRET } = process.env;

const avatarsDir = path.resolve("public", "avatars");

const singup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use")
  }

  const hechPassword = await bcrypt.hash(password, 10)
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({...req.body, password: hechPassword, avatarURL});

  res.status(201).json({user: {
    email: newUser.email,
    subscription: newUser.subscription,
  }})
}

const singin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong")
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong")
  }

  const payload = {
    id: user._id,
  }

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  })
}

const getCurrent = (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  })
}

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json()
}

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: oldPath, filename } = req.file;

  await Jimp.read(oldPath)
		.then(avatar => {
			return avatar.resize(250, 250).quality(70).write(oldPath);
		})
		.catch(err => {
			throw err;
    });
  
  const resultUpdate = path.join(avatarsDir, filename);
  await fs.rename(oldPath, resultUpdate);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  })
}


export default {
  singup: ctrlWrapper(singup),
  singin: ctrlWrapper(singin),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
}