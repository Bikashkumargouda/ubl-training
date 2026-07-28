const mongoose = require("mongoose");

const trainingRecordSchema = new mongoose.Schema(
  {
    contractor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contractor",
      required: true,
    },

    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TrainingTopic",
      required: true,
    },

    duration: {
      type: Number,
      default: 20,
    },

    trainingDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("TrainingRecord", trainingRecordSchema);
