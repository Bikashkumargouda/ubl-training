require("dotenv").config();

const connectDB = require("./config/db");

const Contractor = require("./models/Contractor");
const Employee = require("./models/Employee");
const TrainingTopic = require("./models/TrainingTopic");

const seed = async () => {
  try {
    await connectDB();

    console.log("Cleaning Database...");

    await Contractor.deleteMany({});
    await Employee.deleteMany({});
    await TrainingTopic.deleteMany({});

    console.log("Adding Contractors...");

    const contractors = await Contractor.insertMany([
      {
        name: "M/s Banshidhar Parida",
        trainer: "Mr. Banshidhar Parida",
      },
      {
        name: "Maa Bateswari",
        trainer: "Mr. Rajesh Kumar",
      },
      {
        name: "NIS",
        trainer: "Mr. Santosh Nayak",
      },
      {
        name: "JSR",
        trainer: "Mr. Biswajit Das",
      },
      {
        name: "SIS",
        trainer: "Mr. Ramesh Pradhan",
      },
    ]);

    console.log("Adding Employees...");

    await Employee.insertMany([
      {
        employeeId: "BP001",
        employeeName: "Rakesh Kumar",
        contractor: contractors[0]._id,
        designation: "Helper",
        gender: "Male",
      },
      {
        employeeId: "BP002",
        employeeName: "Suresh Das",
        contractor: contractors[0]._id,
        designation: "Operator",
        gender: "Male",
      },
      {
        employeeId: "BP003",
        employeeName: "Anil Behera",
        contractor: contractors[0]._id,
        designation: "Technician",
        gender: "Male",
      },

      {
        employeeId: "MB001",
        employeeName: "Rohit Nayak",
        contractor: contractors[1]._id,
        designation: "Operator",
        gender: "Male",
      },
      {
        employeeId: "MB002",
        employeeName: "Manoj Sahu",
        contractor: contractors[1]._id,
        designation: "Helper",
        gender: "Male",
      },

      {
        employeeId: "N001",
        employeeName: "Rajesh",
        contractor: contractors[2]._id,
        designation: "Supervisor",
        gender: "Male",
      },
      {
        employeeId: "N002",
        employeeName: "Ajay",
        contractor: contractors[2]._id,
        designation: "Operator",
        gender: "Male",
      },

      {
        employeeId: "J001",
        employeeName: "Santosh",
        contractor: contractors[3]._id,
        designation: "Operator",
        gender: "Male",
      },
      {
        employeeId: "J002",
        employeeName: "Biswajit",
        contractor: contractors[3]._id,
        designation: "Technician",
        gender: "Male",
      },

      {
        employeeId: "S001",
        employeeName: "Ramesh",
        contractor: contractors[4]._id,
        designation: "Supervisor",
        gender: "Male",
      },
      {
        employeeId: "S002",
        employeeName: "Prakash",
        contractor: contractors[4]._id,
        designation: "Helper",
        gender: "Male",
      },
    ]);

    console.log("Adding Training Topics...");

    await TrainingTopic.insertMany([
      { topicName: "Fire Safety", duration: 20 },
      { topicName: "PPE Awareness", duration: 20 },
      { topicName: "Work at Height", duration: 20 },
      { topicName: "Confined Space", duration: 20 },
      { topicName: "Electrical Safety", duration: 20 },
      { topicName: "Machine Safety", duration: 20 },
      { topicName: "Chemical Safety", duration: 20 },
      { topicName: "Road Safety", duration: 20 },
      { topicName: "Emergency Evacuation", duration: 20 },
      { topicName: "First Aid", duration: 20 },
      { topicName: "LOTO", duration: 20 },
      { topicName: "Forklift Safety", duration: 20 },
      { topicName: "Behavior Based Safety", duration: 20 },
      { topicName: "Hot Work Permit", duration: 20 },
      { topicName: "Cold Stress", duration: 20 },
      { topicName: "Heat Stress", duration: 20 },
      { topicName: "Work Permit System", duration: 20 },
      { topicName: "Manual Handling", duration: 20 },
      { topicName: "Housekeeping", duration: 20 },
      { topicName: "Hazard Identification", duration: 20 },
    ]);

    console.log("Database Seeded Successfully");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
