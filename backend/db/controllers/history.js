import history from "../models/history.js";
import { genericErrorHandler } from "../utils/errors";

// Store a new history
export const storeHistory = async (req, res) => {
  try {
    const { user, description, color } = req.body;
    const dbHistory = await history.create({ user, description, color });    
    return res.status(201).json(dbHistory);
  }
  catch (error) {
    // Check the type of error
    genericErrorHandler(error, res);
  }
}

// Output all history of a user
export const getHistory = async (req, res) => {
  try {
    const { user } = req.body;
    const dbHistory = await history.find({ user }).populate("userName");
    if (!dbHistory || dbHistory.length === 0) {
      return res.status(404).json({ error: "No history found." });
    }
    return res.status(200).json(dbHistory);
  }
  catch (error) {
    // Check the type of error
    genericErrorHandler(error, res);
  }
}