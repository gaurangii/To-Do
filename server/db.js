const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
  },
  { timestamps: true }
);

const todoSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    priority: {
      type: String,
      enum: ["High Priority", "Low Priority"],
      default: "Low Priority",
    },
    date: {
      type: Date,
      required: true,
    },
    done: {
      type: String,
      enum: ["Completed", "Not Completed"],
      default: "Not Completed",
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
const Todo = mongoose.model("Todo", todoSchema);

module.exports = { User, Todo };