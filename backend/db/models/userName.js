import mongoose from "mongoose";

const mongoose = require("mongoose");
const userNameSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    account: {
      type: String,
      required: true,
      },
    passWord: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const userName = mongoose.model("userName", userNameSchema);
export default userName;
