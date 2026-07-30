const express = require("express");
const router = express.Router();

const Contractor = require("../models/Contractor");

// ======================================
// GET ALL CONTRACTORS
// ======================================
router.get("/", async (req, res) => {
  try {
    const contractors = await Contractor.find({ status: true })
      .select("_id name trainer")
      .sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: contractors.length,
      data: contractors,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// ======================================
// GET SINGLE CONTRACTOR
// ======================================
router.get("/:id", async (req, res) => {
  try {
    const contractor = await Contractor.findById(req.params.id);

    if (!contractor) {
      return res.status(404).json({
        success: false,
        message: "Contractor not found",
      });
    }

    res.status(200).json({
      success: true,
      data: contractor,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
