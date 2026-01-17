const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
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
    fileUrl: {
      type: String,
      required: true
    },
    message: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Submission", submissionSchema);
