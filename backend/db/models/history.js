import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    historyName: {
      type: String,
      required: true,
    },
    color: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret) => {
        ret.id = ret._id.toString();
        ret.list_id = ret.list_id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

const history = mongoose.model("history", historySchema);
export default history;
