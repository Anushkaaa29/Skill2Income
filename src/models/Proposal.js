const mongoose = require("mongoose");

const proposalSchema = new mongoose.Schema(
  {
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    message: {
      type: String,
      required: true
    },
    bidAmount: {
      type: Number,
      required: true
    },
    // 🔥 NEW FIELDS
    estimatedDays: {
      type: Number,
      default: null
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Proposal", proposalSchema);
