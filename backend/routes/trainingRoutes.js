const express = require("express");
const router = express.Router();

const TrainingRecord = require("../models/TrainingRecord");
const Contractor = require("../models/Contractor");
const TrainingTopic = require("../models/TrainingTopic");

const { generateExcel } = require("../services/excelService");
const { sendTrainingMail } = require("../services/mailService");

router.post("/", async (req, res) => {
  try {
    const { contractor, trainer, employees, topic, duration, trainingDate } =
      req.body;

    // Validation
    if (!contractor)
      return res.status(400).json({
        success: false,
        message: "Contractor is required",
      });

    if (!trainer)
      return res.status(400).json({
        success: false,
        message: "Trainer is required",
      });

    if (!employees || employees.length === 0)
      return res.status(400).json({
        success: false,
        message: "Please select at least one employee",
      });

    if (!topic)
      return res.status(400).json({
        success: false,
        message: "Training topic is required",
      });

    const contractorData = await Contractor.findById(contractor);

    const topicData = await TrainingTopic.findById(topic);

    const record = await TrainingRecord.create({
      contractor,
      trainer,
      employees,
      topic,
      duration: duration || 20,
      trainingDate: trainingDate || new Date(),
    });

    const populatedRecord = await TrainingRecord.findById(record._id)
      .populate("contractor")
      .populate("topic");

    // Create Excel
    const excelPath = await generateExcel(populatedRecord);

    // Send Mail
    await sendTrainingMail({
      to: "kumar.bikash.gouda@gmail.com",
      contractor: contractorData.name,
      topic: topicData.topicName,
      trainer,
      attachment: excelPath,
    });

    return res.status(201).json({
      success: true,
      message: "Training submitted successfully.",
      data: populatedRecord,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
