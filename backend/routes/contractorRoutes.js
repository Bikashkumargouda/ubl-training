const express = require("express");
const router = express.Router();

const Contractor = require("../models/Contractor");

router.get("/", async (req, res) => {
  try {
    const contractors = await Contractor.find().sort({ name: 1 });
    res.json(contractors);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
