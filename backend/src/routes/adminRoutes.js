const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const {
  getAllUsers,
  toggleBlockUser,
  getAllTasks
} = require("../controllers/adminController");

router.get("/users", authMiddleware, adminMiddleware, getAllUsers);
router.put("/users/:userId/block", authMiddleware, adminMiddleware, toggleBlockUser);
router.get("/tasks", authMiddleware, adminMiddleware, getAllTasks);

module.exports = router;
