require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

// Routes
const contractorRoutes = require("./routes/contractorRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const topicRoutes = require("./routes/topicRoutes");
const trainingRoutes = require("./routes/trainingRoutes");

const app = express();

// Connect Database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to United Breweries Training Management API",
    version: "1.0.0",
  });
});

// API Routes
app.use("/api/contractors", contractorRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/training", trainingRoutes);

// 404 Route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API Route Not Found",
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message,
  });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("=================================");
  console.log("🚀 Server Started Successfully");
  console.log(`🌐 Server Running : http://localhost:${PORT}`);
  console.log("=================================");
});
