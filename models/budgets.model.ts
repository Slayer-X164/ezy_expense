import mongoose from "mongoose";

const budgetsScehma = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  emoji: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Budget =
  mongoose.models.Budget || mongoose.model("Budget", budgetsScehma);

export default Budget;
