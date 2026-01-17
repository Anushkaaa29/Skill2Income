const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
  createProposal,
  getTaskProposals,
  acceptProposal
} = require("../controllers/proposalController");

// Student applies to task
router.post(
  "/:taskId",
  authMiddleware,
  roleMiddleware("student"),
  createProposal
);

// Client views proposals
router.get(
  "/task/:taskId",
  authMiddleware,
  roleMiddleware("client"),
  getTaskProposals
);

// Client accepts proposal
router.put(
  "/accept/:proposalId",
  authMiddleware,
  roleMiddleware("client"),
  acceptProposal
);

module.exports = router;
