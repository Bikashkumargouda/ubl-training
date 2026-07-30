const express = require("express");
const router = express.Router();

const TrainingRecord = require("../models/TrainingRecord");
const Contractor = require("../models/Contractor");
const TrainingTopic = require("../models/TrainingTopic");

const { generateExcel } = require("../services/excelService");
const { sendTrainingMail } = require("../services/mailService");

router.post("/", async (req, res) => {
  try {
    const { contractor, trainer, employees, topic, duration } = req.body;

    if (!contractor)
      return res
        .status(400)
        .json({ success: false, message: "Contractor is required" });

    if (!trainer)
      return res
        .status(400)
        .json({ success: false, message: "Trainer is required" });

    if (!employees || employees.length === 0)
      return res
        .status(400)
        .json({ success: false, message: "Please select employees" });

    if (!topic)
      return res
        .status(400)
        .json({ success: false, message: "Topic is required" });

    // Save Training
    const record = await TrainingRecord.create({
      contractor,
      trainer,
      employees,
      topic,
      duration: duration || 20,
    });

    // Populate only contractor and topic
    const populatedRecord = await TrainingRecord.findById(record._id)
      .populate("contractor")
      .populate("topic");

    // // Generate Excel
    // const excelPath = await generateExcel(populatedRecord);

    // // Send Mail
    // await sendTrainingMail({
    //   to: "kumar.bikash.gouda@gmail.com",
    //   contractor: populatedRecord.contractor.name,
    //   trainer: populatedRecord.trainer,
    //   topic: populatedRecord.topic.topicName,
    //   attachment: excelPath,
    // });
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

    res.status(201).json({
      success: true,
      message: "Training Submitted Successfully",
    });
  } catch (err) {
    console.error("Training Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
