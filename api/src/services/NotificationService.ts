import { PrismaClient } from "@prisma/client";
import { kafkaService } from "../producer/producer.js";

export class NotificationService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async sendNotification(userId: number, message: string) {
    try {
      // Fetch user and notification preferences
      const [user, notificationPreference] = await Promise.all([
        this.prisma.user.findUnique({
          where: { id: userId },
        }),
        this.prisma.notificationPreferences.findUnique({
          where: { userId: userId },
        }),
      ]);

      if (!user || !notificationPreference) {
        throw new Error("User or notification preference not found");
      }

      const promises: Promise<void>[] = [];

      if (notificationPreference.email) {
        promises.push(
          kafkaService.sendMessage({
            topic: "email",
            message,
            to: user.email,
          })
        );
      }
      if (notificationPreference.sms) {
        promises.push(
          kafkaService.sendMessage({
            topic: "sms",
            message,
            to: user.mobileNumber,
          })
        );
      }
      if (notificationPreference.whatsapp) {
        promises.push(
          kafkaService.sendMessage({
            topic: "whatsapp",
            message,
            to: user.mobileNumber,
          })
        );
      }

      // Wait for all notifications to be sent
      await Promise.all(promises);

      return { message: "Notification sent successfully" };
    } catch {
      throw new Error("Error sending notification:");
    }
  }
}
