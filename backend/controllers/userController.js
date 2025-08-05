import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    //checking is user already exists
    const exist = await userModel.findOne({ email });
    if (!exist) {
      return res
        .status(400)
        .json({ success: false, message: "User Doesn't exist" });
    }
    //comparing password
    const isMatch = await bcrypt.compare(password, exist.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect credentials" });
    }
    //creating token
    const token = createToken(exist._id);
    //sending response
    res.status(200).json({
      success: true,
      token,
      message: "User logged in successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Error" });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
//register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //checking is user already exists
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    //validating email formate & strong password
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Please enter a strong password",
      });
    }
    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //creating user
    const newUser = await userModel.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    const user = await newUser.save(); //saving user
    //creating token
    const token = createToken(user._id);
    //sending response
    res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

export { loginUser, registerUser };
