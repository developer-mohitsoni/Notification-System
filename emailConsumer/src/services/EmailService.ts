import EmailEngine from "../engine/emailEngine";

class EmailService {
  private static instance: EmailService;

  private constructor() {}

  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  public async sendEmail(to: string, msg: string): Promise<void> {
    const emailObject = {
      subject: "Test Subject",
      htmlContent: msg,
      recipientName: "User",
      recipientEmail: to,
    };

    try {
      await EmailEngine.getInstance().sendEmail(emailObject);
      console.log("✅ Email sent successfully!");
    } catch (error) {
      console.error("❌ Failed to send email", error);
    }
  }
}

export default EmailService;
