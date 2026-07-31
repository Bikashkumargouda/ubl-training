const express = require("express");
const router = express.Router();

const TrainingRecord = require("../models/TrainingRecord");

const { generateExcel } = require("../services/excelService");
const { sendTrainingMail } = require("../services/mailService");

router.post("/", async (req, res) => {
  try {
    const { contractor, trainer, employees, topic, duration } = req.body;

    if (!contractor) {
      return res.status(400).json({
        success: false,
        message: "Contractor is required",
      });
    }

    if (!trainer) {
      return res.status(400).json({
        success: false,
        message: "Trainer is required",
      });
    }

    if (!employees || employees.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please select at least one employee",
      });
    }

    if (!topic) {
      return res.status(400).json({
        success: false,
        message: "Training topic is required",
      });
    }

    // Save Training
    const record = await TrainingRecord.create({
      contractor,
      trainer,
      employees,
      topic,
      duration: duration || 20,
    });

    // Populate data
    const populatedRecord = await TrainingRecord.findById(record._id)
      .populate("contractor")
      .populate("topic");

    // Generate Excel
    const excelPath = await generateExcel(populatedRecord);

    // Send Mail
    await sendTrainingMail({
      to: "testig.bikash@gmail.com",
      contractor: populatedRecord.contractor.name,
      trainer: populatedRecord.trainer,
      topic: populatedRecord.topic.topicName,
      attachment: excelPath,
    });

    return res.status(201).json({
      success: true,
      message: "Training Submitted Successfully",
      data: populatedRecord,
    });
  } catch (err) {
    console.error("Training Error:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
