import { NextResponse } from "next/server";

// Rate limiting is handled by Nginx in production
// For development, consider adding a rate limiting library

interface ContactFormData {
  name: string;
  email: string;
  country: string;
  countryName: string;
  countryDialCode: string;
  mobile?: string;
  companyName: string;
  companySize: string;
  title: string;
  subject: string;
  comment: string;
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
    const requiredFields = [
      "name",
      "email",
      "country",
      "companyName",
      "companySize",
      "subject",
      "comment",
    ];
    for (const field of requiredFields) {
      const value = data[field as keyof ContactFormData];
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

    const mobileDisplay = data.mobile?.trim()
      ? `${data.countryDialCode ? `${data.countryDialCode} ` : ""}${data.mobile.trim()}`
      : "";

    // Create email content
    const emailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(90deg, #ff705a 0%, #ff9472 100%); padding: 30px; text-align: center;">
                    <h1 style="color: white; margin: 0;">New Contact Form Submission</h1>
                </div>
                
                <div style="padding: 30px; background: #f9fbfd;">
                    <h2 style="color: #2c234d; border-bottom: 2px solid #ff705a; padding-bottom: 10px;">
                        ${data.subject}
                    </h2>
                    
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e8ecf4; color: #6a7695; width: 140px;">
                                <strong>Name:</strong>
                            </td>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e8ecf4; color: #2c234d;">
                                ${data.name}
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e8ecf4; color: #6a7695;">
                                <strong>Email:</strong>
                            </td>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e8ecf4; color: #2c234d;">
                                <a href="mailto:${data.email}" style="color: #ff705a;">${data.email}</a>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e8ecf4; color: #6a7695;">
                                <strong>Country:</strong>
                            </td>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e8ecf4; color: #2c234d;">
                                ${data.countryName} (${data.countryDialCode})
                            </td>
                        </tr>
                        ${mobileDisplay
        ? `
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e8ecf4; color: #6a7695;">
                                <strong>Mobile:</strong>
                            </td>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e8ecf4; color: #2c234d;">
                                ${mobileDisplay}
                            </td>
                        </tr>
                        `
        : ""
      }
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e8ecf4; color: #6a7695;">
                                <strong>Company:</strong>
                            </td>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e8ecf4; color: #2c234d;">
                                ${data.companyName}
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e8ecf4; color: #6a7695;">
                                <strong>Company Size:</strong>
                            </td>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e8ecf4; color: #2c234d;">
                                ${data.companySize} employees
                            </td>
                        </tr>
                        ${data.title
        ? `
                        <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e8ecf4; color: #6a7695;">
                                <strong>Title:</strong>
                            </td>
                            <td style="padding: 12px 0; border-bottom: 1px solid #e8ecf4; color: #2c234d;">
                                ${data.title}
                            </td>
                        </tr>
                        `
        : ""
      }
                    </table>
                    
                    <div style="margin-top: 25px; padding: 20px; background: white; border-radius: 10px; border-left: 4px solid #ff705a;">
                        <h3 style="color: #2c234d; margin-top: 0;">Message:</h3>
                        <p style="color: #6a7695; line-height: 1.6; white-space: pre-wrap;">${data.comment}</p>
                    </div>
                </div>
                
                <div style="padding: 20px; text-align: center; background: #2c234d; color: rgba(255,255,255,0.7); font-size: 12px;">
                    This email was sent from the ASKLYZE Contact Form
                </div>
            </div>
        `;

    // Send email via SendGrid API
    const sendGridUrl = "https://api.sendgrid.com/v3/mail/send";

    const emailData = {
      personalizations: [
        {
          to: [
            { email: "admin@apexexperts.net" },
            { email: "ahmed-alsaied@msn.com" },
            { email: "support@asklyze.ai" },
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
