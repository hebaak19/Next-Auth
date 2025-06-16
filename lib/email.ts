import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_ACCOUNT,
    pass: process.env.GOOGLE_NODEMAILER_PASS,
  },
});

export async function sendMail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) {
  await transporter.sendMail({
    from: `"Better Auth App" <${process.env.GMAIL_ACCOUNT}>`,
    to,
    subject,
    html: `<h1>You requested to reset your password </h1>
    <p>${text}</p> `,
  });
}

export async function sendMagicLinkEmail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) {
  await transporter.sendMail({
    from: `"Better Auth App" <${process.env.GMAIL_ACCOUNT}>`,
    to,
    subject,
    html: `<h1>You requested to sign in via magic link </h1>
    <p>${text}</p> `,
  });
}

