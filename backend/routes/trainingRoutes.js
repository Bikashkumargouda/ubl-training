const express = require("express");

const router = express.Router();

const TrainingRecord = require("../models/TrainingRecord");

router.post("/", async (req, res) => {
  try {
    const record = await TrainingRecord.create(req.body);

    res.status(201).json({
      success: true,
      data: record,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
