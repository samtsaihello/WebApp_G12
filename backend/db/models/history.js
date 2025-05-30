import mongoose from "mongoose";

const mongoose = require("mongoose");
const historySchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
      ref: "userName",
    },
    description: {
      type: String,
      required: true,
    },
    color: {
      type: [String],
      required: true,
    },
    
  },
  {
    timestamps: true,
  },
);

const history = mongoose.model("history", historySchema);
export default history;
