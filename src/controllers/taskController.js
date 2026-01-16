const Task = require("../models/Task");

// CREATE TASK (Client)
exports.createTask = async (req, res) => {
  try {
    const { title, description, skillRequired, budget, deadline } = req.body;

    const task = await Task.create({
      client: req.user.id,
      title,
      description,
      skillRequired,
      budget,
      deadline
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL TASKS (Student)
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ status: "open" }).populate(
      "client",
      "name email"
    );
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
