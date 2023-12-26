import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import { hashPassword, comparePassword } from "../helpers/authHelper.js";
// controller for registring user
const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // validation
    if (!name) {
      return res.send({ error: "Name is required" });
    }
    if (!email) {
      return res.send({ error: "Email is required" });
    }
    if (!password) {
      return res.send({ error: "Password is required" });
    }
    // check is user is existing user or otherwise
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already registered please login",
      });
    }
    // register user
    // hash the plain password and then store hashed password
    const hashedPassword = await hashPassword(password);
    // save
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
    }).save();
    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid user credentials",
      });
    }
    // check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    // password matching
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    // token creation for valid user credentials
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

export { registerController, loginController };
