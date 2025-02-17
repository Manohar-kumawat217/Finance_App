import userModel from "../models/user.model.js";
import { createUser, loginUserCheck } from "../services/user.service.js";
import { validationResult } from "express-validator";
// Register a new user
export const registerUser = async (req, res) => {
  try {
    //check for validation errors
    const errors = validationResult(req);
    //if errors exist, return 400 status with error messages
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //extract user data from request body
    const { userName, email, password } = req.body;
    //hash password
    const hashedPassword = await userModel.hashPassword(password);
    //create user
    const user = await createUser({
      userName,
      email,
      password: hashedPassword,
    });

    //send response
    res.status(201).json({
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("THis is error", error);
    res.status(500).json({ message: `Server Error => ${error}` });
  }
};
// Login user
export const loginUser = async (req, res) => {
  try {
    //check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    //Extracting data from request body
    const { email, password } = req.body;
    //check for user in db
    const user = await loginUserCheck({ email, password });
    //generate token
    const token = user.generateAuthToken();
    //sending reponse
    res.status(200).json({
      token,
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: `Server Error =>${error}` });
  }
};

//export as userController
export default { registerUser, loginUser };
