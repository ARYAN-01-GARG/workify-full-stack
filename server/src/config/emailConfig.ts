import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "aryangarg30840@gmail.com",
    pass: "fzmd xxhw qgty crxg",
  },
});

export { transporter };