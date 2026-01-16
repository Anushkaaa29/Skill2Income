const Proposal = require("../models/Proposal");
const Task = require("../models/Task");

// ==============================
// STUDENT applies to task
// ==============================
exports.createProposal = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { message, bidAmount, estimatedDays } = req.body;

    const task = await Task.findById(taskId);
    if (!task)
      return res.status(404).json({ message: "Task not found" });

    if (task.status !== "open")
      return res.status(400).json({ message: "Task is not open" });

    // ❌ Prevent duplicate proposal by same student
    const alreadyApplied = await Proposal.findOne({
      task: taskId,
      student: req.user.id
    });
    if (alreadyApplied)
      return res
        .status(400)
        .json({ message: "You already applied for this task" });

    const proposal = await Proposal.create({
      task: taskId,
      student: req.user.id,
      message,
      bidAmount,
      estimatedDays
    });

    res.status(201).json(proposal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==============================
// CLIENT views proposals for a task
// ==============================
exports.getTaskProposals = async (req, res) => {
  try {
    const { taskId } = req.params;

    const proposals = await Proposal.find({ task: taskId })
      .populate("student", "name email")
      .sort({ createdAt: -1 });

    res.json(proposals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==============================
// CLIENT accepts proposal
// ==============================
exports.acceptProposal = async (req, res) => {
  try {
    const { proposalId } = req.params;

    const proposal = await Proposal.findById(proposalId).populate("task");
    if (!proposal)
      return res.status(404).json({ message: "Proposal not found" });

    // 🔐 Only task owner can accept
    if (proposal.task.client.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Update accepted proposal
    proposal.status = "accepted";
    await proposal.save();

    // Update task
    proposal.task.status = "assigned";
    proposal.task.assignedTo = proposal.student;
    await proposal.task.save();

    // Reject all other proposals for this task
    await Proposal.updateMany(
      { task: proposal.task._id, _id: { $ne: proposalId } },
      { status: "rejected" }
    );

    res.json({
      message: "Proposal accepted successfully",
      assignedTo: proposal.student
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
