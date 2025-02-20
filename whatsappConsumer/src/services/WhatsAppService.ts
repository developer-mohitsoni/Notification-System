import WhatsAppEngine from "../engine/whatsappEngine";

class WhatsAppService {
  private static instance: WhatsAppService;

  private constructor() {}

  public static getInstance(): WhatsAppService {
    if (!WhatsAppService.instance) {
      WhatsAppService.instance = new WhatsAppService();
    }
    return WhatsAppService.instance;
  }

  public async sendWhatsAppMessage(to: string, message: string): Promise<void> {
    try {
      await WhatsAppEngine.getInstance().sendWhatsAppMessage({
        body: message,
        to,
      });
      console.log("✅ WhatsApp message sent successfully!");
    } catch (error) {
      console.error("❌ Failed to send WhatsApp message", error);
    }
  }
}

export default WhatsAppService;
