import userName from "../models/userName.js";
import { genericErrorHandler } from "../utils/errors.js";

// Create a user name
export const getUserName = async (req, res) => {
  try {
    const {name, account, passWord} = req.body;
    const dbUserName = await userName.create({ name, account, passWord });
    return res.status(201).json(dbUserName);
  } catch (error) {
    // Check the type of error
    genericErrorHandler(error, res);
  }
};

// Get user information
export const logIn = async (req, res) => {
  try {
    const { account, passWord } = req.body;
    const dbUserName = await userName.findOne({ account, passWord });
    if (!dbUserName) {
      return res.status(404).json({ error: "Account or password is incorrect" });
    }
    return res.status(200).json(dbUserName);
  } catch (error) {
    // Check the type of error
    genericErrorHandler(error, res);
  }
};

// Update user name
export const updateUserName = async (req, res) => {
  try {
    const { name, account, passWord } = req.body;
    const dbUserName = await userName.findOneAndUpdate(
      { account, passWord },
      { name },
    )
    if (!dbUserName) {
      return res.status(404).json({ error: "Account or password is incorrect" });
    }
    return res.status(200).json(dbUserName);
  } catch (error) {
    // Check the type of error
    genericErrorHandler(error, res);
  }
}