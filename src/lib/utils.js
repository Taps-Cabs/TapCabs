import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
// import nodemailer from "nodemailer";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// export async function mailSender(email, subject, html) {
//   const transporter = nodemailer.createTransport({
//     service: 'Gmail', // or use a custom SMTP config
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   try {
//     const mailReponse = await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject,
//       html,
//     });
//     console.log("Email response", mailReponse);
//     return mailReponse;

//   } catch (err) {
//     console.log("Mail Sending Err", err)
//     return null;

//   }
// }