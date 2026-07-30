const mongoose = require("mongoose");

const trainingTopicSchema = new mongoose.Schema(
  {
    topicName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    duration: {
      type: Number,
      default: 20,
    },

    category: {
      type: String,
      default: "Safety",
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("TrainingTopic", trainingTopicSchema);
