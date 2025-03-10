import { Request, Response } from "express";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const generateToken = (user: any) => {
  return jwt.sign({ id: user._id }, "secret", { expiresIn: "1d" });
};

export const signUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    // check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = generateToken(user);

    res
      .status(201)
      .cookie("token", token, { httpOnly: true, sameSite: "lax" })
      .json({ data: user, message: "User registered successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Error registering user" });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid password" });
      return;
    }


    const token = generateToken(user);
    res
      .status(200)
      .cookie("token", token, { httpOnly: true, sameSite: "lax" })
      .json({ data: user, message: "User signed in successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Error signing in user" });
  }
};


export const signOut = (req: Request, res: Response) => {
  res
    .status(200)
    .clearCookie("token")
    .json({ message: "User signed out successfully" });
};