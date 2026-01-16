const Review = require("../models/Review");
const Task = require("../models/Task");
const User = require("../models/User");

exports.createReview = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { rating, comment } = req.body;

    const task = await Task.findById(taskId);
    if (!task)
      return res.status(404).json({ message: "Task not found" });

    // 🔐 Only task owner can review
    if (task.client.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    // 🔴 IMPORTANT CHECK
    if (!task.assignedTo) {
      return res
        .status(400)
        .json({ message: "Task is not assigned to any student yet" });
    }

    // Create review (NO null now)
    const review = await Review.create({
      task: taskId,
      student: task.assignedTo,
      client: req.user.id,
      rating,
      comment
    });

    // Mark task completed
    task.status = "completed";
    await task.save();

    // Update student rating
    const reviews = await Review.find({ student: task.assignedTo });
    const avgRating =
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await User.findByIdAndUpdate(task.assignedTo, {
      rating: avgRating
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
