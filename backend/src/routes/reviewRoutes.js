const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { createReview } = require("../controllers/reviewController");

// Client gives review
router.post(
  "/:taskId",
  authMiddleware,
  roleMiddleware("client"),
  createReview
);

module.exports = router;
