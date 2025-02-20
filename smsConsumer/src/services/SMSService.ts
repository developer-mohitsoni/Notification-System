import SMSEngine from "../engine/smsEngine";

class SMSService {
  private static instance: SMSService;

  private constructor() {}

  public static getInstance(): SMSService {
    if (!SMSService.instance) {
      SMSService.instance = new SMSService();
    }
    return SMSService.instance;
  }

  public async sendSMS(to: string, message: string): Promise<void> {
    try {
      await SMSEngine.getInstance().sendSMS({ body: message, to });
      console.log("✅ SMS sent successfully!");
    } catch (error) {
      console.error("❌ Failed to send SMS", error);
    }
  }
}

export default SMSService;
