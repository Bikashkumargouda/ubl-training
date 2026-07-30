const express = require("express");

const router = express.Router();

const Employee = require("../models/Employee");

// ===========================================
// GET EMPLOYEES BY CONTRACTOR
// ===========================================
router.get("/:contractorId", async (req, res) => {
  try {
    const employees = await Employee.find({
      contractor: req.params.contractorId,
      status: true,
    })
      .select("_id employeeId employeeName designation gender contractor")
      .sort({
        employeeName: 1,
      });

    res.status(200).json({
      success: true,
      count: employees.length,
      data: employees,
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
