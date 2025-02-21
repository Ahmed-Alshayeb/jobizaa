import nodemailer from "nodemailer";

const sendEmail = async (to, subject, html, attachments = []) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject,
    html,
    attachments,
  });
  return info.accepted.length ? true : false;
};

export default sendEmail;
