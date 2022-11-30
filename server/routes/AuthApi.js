import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/register", async (req, res) => {
  // get all form  data
  const { email, password, firstName, lastName } = req.body;
  // check if user exists with same email
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(406).json({ message: "User already exists." });
    return;
  }

  // hash the password
  const saltRounds = 10;
  const salt = await bcrypt.genSaltSync(saltRounds);
  const hashedPassword = await bcrypt.hashSync(password, salt);

  // store user
  const user = await User({
    email,
    password: hashedPassword,
    firstName,
    lastName,
  });
  await user.save();

  res.status(201).json({ message: "User is created" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (!userExists) {
    res.status(406).json({ message: "Invalid email" });
    return;
  }

  const matched = await bcrypt.compare(password, userExists.password);
  if (!matched) {
    res.status(406).json({ message: "Invalid password" });
    return;
  }

  // create JWT token
  const payload = {
    username: email,
    _id: userExists._id,
  };
  const token = jwt.sign(payload, "some secret.");
  console.log(token);
  res.json({message: "successfully logged in.", token});
});

export default router;
