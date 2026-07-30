const ExcelJS = require("exceljs");
const path = require("path");
const fs = require("fs");

const generateExcel = async (training) => {
  const workbook = new ExcelJS.Workbook();

  const sheet = workbook.addWorksheet("Training Attendance");

  sheet.columns = [
    { header: "Date", key: "date", width: 18 },
    { header: "Contractor Name", key: "contractor", width: 35 },
    { header: "Trainer Name", key: "trainer", width: 30 },
    { header: "Employee Code", key: "code", width: 20 },
    { header: "Employee Name", key: "employee", width: 35 },
    { header: "Training Topic", key: "topic", width: 35 },
    { header: "Duration (Minutes)", key: "duration", width: 20 },
  ];

  sheet.getRow(1).font = {
    bold: true,
    color: { argb: "FFFFFFFF" },
  };

  sheet.getRow(1).fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "008000" },
  };

  sheet.getRow(1).alignment = {
    vertical: "middle",
    horizontal: "center",
  };

  const date = new Date(training.trainingDate).toLocaleDateString();

  training.employees.forEach((emp) => {
    sheet.addRow({
      date,
      contractor: training.contractor.name,
      trainer: training.trainer,
      code: emp.employeeId,
      employee: emp.employeeName,
      topic: training.topic.topicName,
      duration: training.duration,
    });
  });

  const folder = path.join(__dirname, "../exports");

  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }

  const fileName = `Training_${Date.now()}.xlsx`;

  const filePath = path.join(folder, fileName);

  await workbook.xlsx.writeFile(filePath);

  return filePath;
};

module.exports = {
  generateExcel,
};
