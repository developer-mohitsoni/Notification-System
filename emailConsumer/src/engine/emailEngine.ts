import { Resend } from "resend";
import "dotenv/config";
import { SendEmail } from "../../index";

class EmailEngine {
  private static instance: EmailEngine;
  private resend: Resend;

  private constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY || "");
  }

  public static getInstance(): EmailEngine {
    if (!EmailEngine.instance) {
      EmailEngine.instance = new EmailEngine();
    }

    return EmailEngine.instance;
  }

  public async sendEmail({
    subject,
    htmlContent,
    recipientName,
    recipientEmail,
  }: SendEmail): Promise<void> {
    try {
      const response = await this.resend.emails.send({
        from: `${process.env.SENDER_NAME} <${process.env.SENDER_EMAIL}>`,
        to: recipientEmail,
        subject: subject,
        html: htmlContent,
      });

      console.log("Email sent successfully:", response);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
}

export default EmailEngine;
