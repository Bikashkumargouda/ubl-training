const nodemailer = require("nodemailer");
const path = require("path");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendTrainingMail = async ({
  to,
  contractor,
  trainer,
  topic,
  attachment,
}) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "United Breweries Training Attendance Report",

    html: `
        <h2>United Breweries Limited</h2>

        <p>Training completed successfully.</p>

        <table border="1" cellpadding="8" cellspacing="0">

            <tr>
                <th align="left">Contractor</th>
                <td>${contractor}</td>
            </tr>

            <tr>
                <th align="left">Trainer</th>
                <td>${trainer}</td>
            </tr>

            <tr>
                <th align="left">Training Topic</th>
                <td>${topic}</td>
            </tr>

        </table>

        <br>

        <p>
        Please find the attached attendance sheet.
        </p>
    `,

    attachments: [
      {
        filename: path.basename(attachment),
        path: attachment,
      },
    ],
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendTrainingMail,
};
