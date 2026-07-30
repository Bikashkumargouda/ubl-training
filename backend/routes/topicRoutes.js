const express = require("express");

const router = express.Router();

const TrainingTopic = require("../models/TrainingTopic");

// ===========================================
// GET ALL TRAINING TOPICS
// ===========================================
router.get("/", async (req, res) => {
  try {
    const topics = await TrainingTopic.find({
      status: true,
    })
      .select("_id topicName duration")
      .sort({
        topicName: 1,
      });

    res.status(200).json({
      success: true,
      count: topics.length,
      data: topics,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
