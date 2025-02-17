import userModel from "../models/user.model.js";

export const createUser = async ({ userName, email, password }) => {
  //check if all fields are provided
  if (!userName || !email || !password) {
    throw new Error("All fields are required");
  }
  //check is user already exists
  const prevUser = await userModel.findOne({ email });
  if (prevUser) {
    throw new Error("User already exists");
  }
  const user = await userModel.create({ userName, email, password });
  return user;
};

export const loginUserCheck = async ({ email, password }) => {
  //check if all fields are provided
  if (!email || !password) {
    throw new Error("All fields are required");
  }
  //check if user exists
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("User not exists please register");
  }
  //compare password
  console.log("Passwords ========== =========== =================");
  const isMatch = await user.comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid Credentials");
  }
  return user;
};
