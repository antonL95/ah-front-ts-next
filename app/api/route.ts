import { NextResponse } from "next/server";
import { ContactFormData } from "@/ah/utils/type";

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(request: Request) {
  const body: ContactFormData = await request.json();

  const msg = {
    to: ["marek@artistshero.com", "admin@artistshero.com"],
    from: "web@artistshero.com",
    replyTo: body.email,
    subject: `[WEB REQUEST] - ${body.subject} FROM: ${body.email}`,
    text: body.message,
    html: `<p>${body.message}</p><p>From: ${body.name}</p>`,
  };

  try {
    await sgMail.send(msg);

    return NextResponse.json({ success: 1 }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}
