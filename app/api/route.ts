import { NextResponse } from "next/server";
import { ContactFormData } from "@/ah/utils/type";
const nodemailer = require("nodemailer");

export const runtime = "edge";
export async function POST(request: Request) {
  const body: ContactFormData = await request.json();

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD
    }
  });

  const msg = {
    to: ["marek@artistshero.com", "info@artistshero.com"],
    from: "web@artistshero.com",
    replyTo: body.email,
    subject: `[WEB REQUEST] - ${body.subject} FROM: ${body.email}`,
    text: body.message,
    html: `<p>${body.message}</p><p>From: ${body.name}</p>`,
  };

  try {
    await transporter.sendMail(msg);

    return NextResponse.json({ success: 1 }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}
