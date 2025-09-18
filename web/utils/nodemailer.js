import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const smtp_user = process.env.SMTP_USERNAME;
const smtp_pass = process.env.SMTP_PASSWORD;
const smtp_host = process.env.SMTP_HOST;
const smtp_port = process.env.SMTP_PORT;

const transporter = nodemailer.createTransport({
  host: smtp_host,
  port: smtp_port,
  secure: (smtp_port === 465 ? true : false),
  auth: {
    user: smtp_user,
    pass: smtp_pass,
  },
});

export async function sendMail() {
  try {
    const currentTime = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; background-color:#f9fafb; padding:20px; color:#333;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" 
              style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
          <tr>
            <td style="background:#2563eb; padding:20px; text-align:center; color:#ffffff; font-size:22px; font-weight:bold;">
              🔔 Store Monitor Alert
            </td>
          </tr>
          <tr>
            <td style="padding:30px;">
              <h2 style="margin-top:0; color:#111827; font-size:20px;">No Orders in Last 15 Minutes</h2>
              <p style="line-height:1.6; color:#374151; font-size:15px;">
                Hi there,  
                <br><br>
                Your store hasn’t received any new orders in the last <strong>15 minutes</strong>.
              </p>

              <div style="margin:20px 0; padding:15px; background:#f3f4f6; border-left:4px solid #2563eb; border-radius:6px; font-size:14px; color:#111827;">
                <strong>⏱ Alert Generated:</strong> ${currentTime}
              </div>

              <h3 style="color:#111827; margin-bottom:10px;">🚀 What you can do:</h3>
              <ul style="padding-left:20px; color:#374151; line-height:1.6; font-size:15px;">
                <li>Check your website traffic and marketing campaigns</li>
                <li>Review product promotions and pricing</li>
                <li>Ensure checkout process is working smoothly</li>
                <li>Consider running a flash sale or promotion</li>
              </ul>

              <p style="margin-top:25px; font-size:13px; color:#6b7280; line-height:1.5;">
                This is an automated alert from your e-commerce monitoring system.  
                Please do not reply to this email.
              </p>
            </td>
          </tr>
          <tr>
            <td style="background:#f9fafb; text-align:center; padding:15px; font-size:12px; color:#6b7280;">
              &copy; ${new Date().getFullYear()} Store Monitor • All rights reserved.
            </td>
          </tr>
        </table>
      </div>
    `;

    const recipients = [
      "sahilpanjwani195@gmail.com",
      "alamomair724@gmail.com",
      "kambojkalrikamboj@gmail.com",
    ];

    await transporter.sendMail({
      from: '"Store Monitor Alert" <s.p.s.a.h.i.l.p.a.n.j.w.a.n.i@gmail.com>',
      to: recipients,
      subject: "🔔 Store Alert: No Orders in Last 15 Minutes",
      text: `Store Activity Alert

    No Recent Orders Detected
    Your store hasn't received any new orders in the last 15 minutes.

    Alert Generated: ${currentTime}

    What you can do:
    - Check your website traffic and marketing campaigns
    - Review your product promotions and pricing  
    - Ensure your checkout process is working smoothly
    - Consider running a flash sale or promotion

    This is an automated alert from your e-commerce monitoring system.`,
      html: htmlTemplate,
    });
  } catch (error) {
    console.error("❌ Failed to send monitoring alert:", error?.message);
  }
}
