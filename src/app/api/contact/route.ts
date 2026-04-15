import { NextResponse } from "next/server";

// Rate limiting is handled by Nginx in production
// For development, consider adding a rate limiting library

interface ContactFormData {
  name: string;
  email: string;
  country: string;
  phone?: string;
  phoneCode?: string;
  companyName: string;
  companySize: string;
  role?: string;
  subject: string;
  message: string;
}

class ContactFormError extends Error {
  status: number;
  clientMessage: string;

  constructor(clientMessage: string, status = 500, debugMessage?: string) {
    super(debugMessage || clientMessage);
    this.status = status;
    this.clientMessage = clientMessage;
    this.name = "ContactFormError";
  }
}

function getEmailConfig(): {
  apiKey: string;
  mailFrom: string;
} {
  const apiKey = process.env.SENDGRID_API_KEY;
  const mailFrom = process.env.MAIL_FROM;
  const missing: string[] = [];

  if (!apiKey) missing.push("SENDGRID_API_KEY");
  if (!mailFrom) missing.push("MAIL_FROM");

  if (missing.length > 0) {
    throw new ContactFormError(
      "Email service is not configured. Please contact support.",
      500,
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }

  return {
    apiKey: apiKey!,
    mailFrom: mailFrom!,
  };
}

export async function POST(request: Request) {
  try {
    const data: ContactFormData = await request.json();
    const emailConfig = getEmailConfig();

    // Validate required fields
    const requiredFields: (keyof ContactFormData)[] = [
      "name",
      "email",
      "country",
      "companyName",
      "companySize",
      "subject",
      "message",
    ];
    for (const field of requiredFields) {
      const value = data[field];
      if (typeof value !== "string" || !value.trim()) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Build email HTML
    const rows = [
      ["Name", data.name],
      ["Email", `<a href="mailto:${data.email}" style="color:#1f2a6b;text-decoration:none;font-weight:600">${data.email}</a>`],
      ["Country", data.country],
      ...(data.phone?.trim() 
        ? [["Phone", `${data.phoneCode || ""} ${data.phone.trim()}`.trim()]] 
        : []),
      ["Company Name", data.companyName],
      ["Company Size", `${data.companySize} employees`],
      ...(data.role?.trim() ? [["Role", data.role.trim()]] : []),
    ];

    const tableRows = rows
      .map(
        ([label, value]) => `
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #e8ebf8;color:#5b647e;width:140px;font-size:14px">
            <strong>${label}:</strong>
          </td>
          <td style="padding:12px 0;border-bottom:1px solid #e8ebf8;color:#1a1a1a;font-size:14px">
            ${value}
          </td>
        </tr>`
      )
      .join("");

    const emailHtml = `
      <div style="font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;background-color:#ffffff;border:1px solid #e8ebf8;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.05)">
        <div style="background-color:#1f2a6b;padding:40px 30px;text-align:center">
          <h1 style="color:#ffffff;margin:0;font-size:24px;font-weight:700;letter-spacing:-0.02em">New Contact Request</h1>
          <p style="color:rgba(255,255,255,0.8);margin:10px 0 0 0;font-size:14px">Asklyze Landing Page Submission</p>
        </div>
        <div style="padding:40px 30px;background-color:#ffffff">
          <h2 style="color:#1a1a1a;font-size:20px;margin:0 0 24px 0;padding-bottom:12px;border-bottom:2px solid #e8ebf8">
            ${data.subject}
          </h2>
          <table style="width:100%;border-collapse:collapse">
            ${tableRows}
          </table>
          <div style="margin-top:32px;padding:24px;background-color:#f7f8fc;border-radius:12px;border-left:4px solid #1f2a6b">
            <h3 style="color:#1a1a1a;margin:0 0 12px 0;font-size:16px">Message Content:</h3>
            <p style="color:#5b647e;line-height:1.6;margin:0;white-space:pre-wrap;font-size:15px">${data.message}</p>
          </div>
        </div>
        <div style="padding:24px;text-align:center;background-color:#f7f8fc;color:#94a3b8;font-size:12px;border-top:1px solid #e8ecf4">
          <p style="margin:0">This is an automated notification from your Asklyze website.</p>
          <p style="margin:4px 0 0 0">&copy; ${new Date().getFullYear()} Asklyze. All rights reserved.</p>
        </div>
      </div>`;

    // Send email via SendGrid API
    const sendGridUrl = "https://api.sendgrid.com/v3/mail/send";

    const emailData = {
      personalizations: [
        {
          to: [
            { email: "amr.mohamed@apexexperts.net" }
          ],
        },
      ],
      from: {
        email: emailConfig.mailFrom,
        name: "ASKLYZE",
      },
      reply_to: {
        email: data.email,
        name: data.name,
      },
      subject: `[ASKLYZE Contact] ${data.subject}`,
      content: [
        {
          type: "text/html",
          value: emailHtml,
        },
      ],
    };

    const sendResponse = await fetch(sendGridUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${emailConfig.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    // SendGrid returns 202 Accepted on success
    if (!sendResponse.ok) {
      const errorText = await sendResponse.text();
      throw new ContactFormError(
        "Failed to send message. Please try again later.",
        502,
        `SendGrid API failed (${sendResponse.status}): ${errorText}`
      );
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully!",
    });
  } catch (error) {
    if (error instanceof ContactFormError) {
      console.error("Contact form error:", error.message);
      const isProduction = process.env.NODE_ENV === "production";

      return NextResponse.json(
        {
          error: isProduction
            ? error.clientMessage
            : `${error.clientMessage} (${error.message})`,
        },
        { status: error.status }
      );
    }

    console.error("Contact form unexpected error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
