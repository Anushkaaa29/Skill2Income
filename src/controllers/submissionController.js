const Submission = require("../models/Submission");
const Task = require("../models/Task");

// ==============================
// STUDENT submits work
// ==============================
exports.createSubmission = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { message } = req.body;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // 🔥 IMPORTANT: Check assignment first
    if (!task.assignedTo) {
      return res
        .status(400)
        .json({ message: "Task is not assigned yet" });
    }

    // Only assigned student can submit
    if (task.assignedTo.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    // File check
    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    const submission = await Submission.create({
      task: taskId,
      student: req.user.id,
      fileUrl: req.file.path,
      message
    });

    res.status(201).json(submission);
  } catch (error) {
    console.error("Submission Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ==============================
// CLIENT views submission
// ==============================
exports.getTaskSubmission = async (req, res) => {
  try {
    const submission = await Submission.findOne({
      task: req.params.taskId
    }).populate("student", "name email");

    if (!submission) {
      return res.status(404).json({ message: "No submission found" });
    }

    res.json(submission);
  } catch (error) {
    console.error("Get Submission Error:", error);
    res.status(500).json({ message: error.message });
  }
};
