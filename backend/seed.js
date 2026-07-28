require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = require("./config/db");

const Contractor = require("./models/Contractor");
const Employee = require("./models/Employee");
const TrainingTopic = require("./models/TrainingTopic");

const seed = async () => {
  try {
    await connectDB();

    await Contractor.deleteMany();
    await Employee.deleteMany();
    await TrainingTopic.deleteMany();

    // Contractors
    const contractors = await Contractor.insertMany([
      { name: "M/s Banshidhar Parida" },
      { name: "Maa Bateswari" },
      { name: "NIS" },
      { name: "JSR" },
      { name: "SIS" },
    ]);

    // Employees
    const employees = [
      {
        employeeId: "BP001",
        employeeName: "Rakesh Kumar",
        contractor: contractors[0]._id,
      },
      {
        employeeId: "BP002",
        employeeName: "Suresh Das",
        contractor: contractors[0]._id,
      },
      {
        employeeId: "BP003",
        employeeName: "Anil Behera",
        contractor: contractors[0]._id,
      },

      {
        employeeId: "MB001",
        employeeName: "Rohit Nayak",
        contractor: contractors[1]._id,
      },
      {
        employeeId: "MB002",
        employeeName: "Manoj Sahu",
        contractor: contractors[1]._id,
      },

      {
        employeeId: "N001",
        employeeName: "Rajesh",
        contractor: contractors[2]._id,
      },
      {
        employeeId: "N002",
        employeeName: "Ajay",
        contractor: contractors[2]._id,
      },

      {
        employeeId: "J001",
        employeeName: "Santosh",
        contractor: contractors[3]._id,
      },
      {
        employeeId: "J002",
        employeeName: "Biswajit",
        contractor: contractors[3]._id,
      },

      {
        employeeId: "S001",
        employeeName: "Ramesh",
        contractor: contractors[4]._id,
      },
      {
        employeeId: "S002",
        employeeName: "Prakash",
        contractor: contractors[4]._id,
      },
    ];

    await Employee.insertMany(employees);

    // Training Topics
    await TrainingTopic.insertMany([
      { topicName: "Fire Safety" },
      { topicName: "PPE Awareness" },
      { topicName: "Work at Height" },
      { topicName: "Confined Space" },
      { topicName: "Electrical Safety" },
      { topicName: "Machine Safety" },
      { topicName: "Chemical Safety" },
      { topicName: "Road Safety" },
      { topicName: "Emergency Evacuation" },
      { topicName: "First Aid" },
      { topicName: "LOTO" },
      { topicName: "Forklift Safety" },
      { topicName: "Behavior Based Safety" },
      { topicName: "Hot Work Permit" },
      { topicName: "Cold Stress" },
      { topicName: "Heat Stress" },
      { topicName: "Work Permit System" },
      { topicName: "Manual Handling" },
      { topicName: "Housekeeping" },
      { topicName: "Hazard Identification" },
    ]);

    console.log("Database Seeded Successfully");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

seed();
