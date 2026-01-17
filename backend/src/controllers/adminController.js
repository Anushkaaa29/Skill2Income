const User = require("../models/User");
const Task = require("../models/Task");

// GET all users
exports.getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// BLOCK / UNBLOCK user
exports.toggleBlockUser = async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.isBlocked = !user.isBlocked;
  await user.save();

  res.json({
    message: `User ${user.isBlocked ? "blocked" : "unblocked"} successfully`
  });
};

// GET all tasks
exports.getAllTasks = async (req, res) => {
  const tasks = await Task.find()
    .populate("client", "name email")
    .populate("assignedTo", "name email");
  res.json(tasks);
};
