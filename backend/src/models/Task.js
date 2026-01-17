const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    skillRequired: {
      type: String,
      required: true
    },
    budget: {
      type: Number,
      required: true
    },
    deadline: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ["open", "assigned", "completed"],
      default: "open"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
