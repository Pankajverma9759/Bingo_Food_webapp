import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config()

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // Use true for port 465, false for port 587
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

export const sendOtpEmail = async (to, otp)=>{
        await  transporter.sendMail({
          from: process.env.EMAIL,
          to: to,
          subject: "Reset Your Password",
          text: `Your OTP for password reset is ${otp}.This OTP is valid for 5 minutes. `,
        })
}