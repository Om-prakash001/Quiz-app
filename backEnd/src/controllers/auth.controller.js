import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/jwt.js";

export const signup = async (req, res) => {
  //for acessing data from req body
  const { email, username, password } = req.body;

  try {
    if (!email || !username || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }
    //check password length
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 character long" });
    }

    //check if email already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    //Generating salt and hash password
    const salt = await bcrypt.genSalt(10); //genSalt(10) means 10 rounds of hashing (random string added to password)

    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });

    if (newUser) {
      //save user to db
      await newUser.save();
      //generate jwt token here
      generateToken(newUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        username: newUser.username,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // generate jwt token and set cookie
    const token = generateToken(user._id, res);
    console.log("JWT token set in cookie:", token);

    // send response
    return res.status(200).json({
      _id: user._id,
      email: user.email,
      username: user.username,
    });

  } catch (error) {
    console.log("Error in login controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(" Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const me = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in me controller:", error.message);
    res.status(500).json({ message: "Failed to get user" });
  }
};

