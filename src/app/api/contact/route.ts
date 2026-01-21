import { NextResponse } from "next/server";

// Rate limiting is handled by Nginx in production
// For development, consider adding a rate limiting library

interface ContactFormData {
  name: string;
  email: string;
  country: string;
  countryName: string;
  countryDialCode: string;
  companyName: string;
  companySize: string;
  title: string;
  subject: string;
  comment: string;
}

async function getAccessToken() {
  const tenantId = process.env.AZURE_TENANT_ID;
  const clientId = process.env.AZURE_CLIENT_ID;
  const clientSecret = process.env.AZURE_CLIENT_SECRET;

  if (!tenantId || !clientId || !clientSecret) {
    throw new Error("Azure credentials not configured");
  }

  const tokenEndpoint = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("scope", "https://graph.microsoft.com/.default");
  params.append("client_secret", clientSecret);
  params.append("grant_type", "client_credentials");

  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Token fetch error:", errorText);
    throw new Error("Failed to get access token");
  }

  const data = await response.json();
  return data.access_token;
}

export async function POST(request: Request) {
  try {
    const data: ContactFormData = await request.json();

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
      if (!data[field as keyof ContactFormData]) {
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
                        ${
                          data.title
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

    // Send email via Microsoft Graph API
    const mailFrom = process.env.MAIL_FROM;
    if (!mailFrom) {
      console.error("MAIL_FROM environment variable is not set");
      // Log for debugging
      console.log("=== Contact Form Submission (Failed to send) ===");
      console.log("Data:", JSON.stringify(data, null, 2));

      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const accessToken = await getAccessToken();
    const sendMailUrl = `https://graph.microsoft.com/v1.0/users/${mailFrom}/sendMail`;

    const emailData = {
      message: {
        subject: `[ASKLYZE Contact] ${data.subject}`,
        body: {
          contentType: "HTML",
          content: emailHtml,
        },
        toRecipients: [
          {
            emailAddress: {
              address: "admin@apexexperts.net",
            },
          },
        ],
        replyTo: [
          {
            emailAddress: {
              address: data.email,
              name: data.name,
            },
          },
        ],
      },
      saveToSentItems: "false",
    };

    const sendResponse = await fetch(sendMailUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    if (!sendResponse.ok) {
      const errorText = await sendResponse.text();
      console.error("Graph API Error:", errorText);
      throw new Error("Failed to send email via Graph API");
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully!",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
