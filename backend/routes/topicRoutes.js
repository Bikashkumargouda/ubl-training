const express = require("express");

const router = express.Router();

const TrainingTopic = require("../models/TrainingTopic");

router.get("/", async (req, res) => {
  try {
    const topics = await TrainingTopic.find().sort({
      topicName: 1,
    });

    res.json(topics);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
