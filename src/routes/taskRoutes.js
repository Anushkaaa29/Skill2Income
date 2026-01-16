const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
  createTask,
  getAllTasks
} = require("../controllers/taskController");

// Client creates task
router.post(
  "/",
  authMiddleware,
  roleMiddleware("client"),
  createTask
);

// Student views tasks
router.get(
  "/",
  authMiddleware,
  roleMiddleware("student"),
  getAllTasks
);

module.exports = router;
