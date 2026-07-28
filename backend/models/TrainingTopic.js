const mongoose = require("mongoose");

const trainingTopicSchema = new mongoose.Schema(
  {
    topicName: {
      type: String,
      required: true,
      unique: true,
    },
    duration: {
      type: Number,
      default: 20,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("TrainingTopic", trainingTopicSchema);
