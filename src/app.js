const express = require("express");
const cors = require("cors");

const app = express();

// 🔥 BODY PARSERS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// 🔥 SERVE UPLOADED FILES (ROOT /uploads)
app.use("/uploads", express.static("uploads"));

// ROUTES
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const proposalRoutes = require("./routes/proposalRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const adminRoutes = require("./routes/adminRoutes");
const submissionRoutes = require("./routes/submissionRoutes"); // 🔥 ADD THIS

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/proposals", proposalRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/submissions", submissionRoutes); // 🔥 ADD THIS

// TEST ROOT
app.get("/", (req, res) => {
  res.send("Skill2Income Backend Running");
});

module.exports = app;
