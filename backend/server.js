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

// =============================
// Connect MongoDB
// =============================
connectDB();

// =============================
// Middlewares
// =============================
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

// =============================
// Home Route
// =============================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to United Breweries Training Management API",
    version: "2.0.0",
    status: "Running",
  });
});

// Health Check
app.get("/health", (req, res) => {
  res.json({
    success: true,
    server: "Running",
    database: "Connected",
    time: new Date(),
  });
});

// =============================
// API Routes
// =============================
app.use("/api/contractors", contractorRoutes);

app.use("/api/employees", employeeRoutes);

app.use("/api/topics", topicRoutes);

app.use("/api/training", trainingRoutes);

// =============================
// 404
// =============================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// =============================
// Error Handler
// =============================
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// =============================
// Start Server
// =============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("===========================================");
  console.log("United Breweries Training Management");
  console.log("===========================================");
  console.log(`Server Running : ${PORT}`);
  console.log(`MongoDB : Connected`);
  console.log("===========================================");
});
