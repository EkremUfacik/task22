import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken";

type RequestBody = { username: string; password: string };

const registerUser = async (req: Request, res: Response) => {
  try {
    const body = req.body as RequestBody;
    const { username, password } = body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const userExists = await User.findOne({ username });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPw = await bcrypt.hash(password, 10);

    const user = new User({ username, password: hashedPw });
    await user.save();
    generateToken(res, user._id.toString());
    res.status(200).json({
      message: "User created",
      userId: user._id,
      username: user.username,
    });
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const body = req.body as RequestBody;
    const { username, password } = body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "User could not be found" });
    }

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      return res.status(401).json({ message: "Password is incorrect" });
    }

    generateToken(res, user._id.toString());
    res.status(200).json({
      message: "Logged in",
      userId: user._id,
      username: user.username,
    });
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};

export { registerUser, loginUser };
