const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");
const {
  createSubmission,
  getTaskSubmission
} = require("../controllers/submissionController");

// Student uploads submission
router.post(
  "/:taskId",
  authMiddleware,
  roleMiddleware("student"),
  upload.single("file"),
  createSubmission
);

// Client views submission
router.get(
  "/:taskId",
  authMiddleware,
  roleMiddleware("client"),
  getTaskSubmission
);

module.exports = router;
