const express = require("express");

const router = express.Router();

const Employee = require("../models/Employee");

router.get("/:contractorId", async (req, res) => {
  try {
    const employees = await Employee.find({
      contractor: req.params.contractorId,
    }).sort({
      employeeName: 1,
    });

    res.json(employees);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
