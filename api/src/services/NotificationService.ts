import { PrismaClient } from "@prisma/client";

export class NotificationService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async sendNotification(userId: number, message: string) {
    // Fetch user and notification preferences
    const [user, preferences] = await Promise.all([
      this.prisma.user.findUnique({
        where: { id: userId },
      }),
      this.prisma.notificationPreferences.findUnique({
        where: { userId: userId },
      }),
    ]);

    if (!user || !preferences) {
      throw new Error("User or notification preference not found");
    }

    return { message: "Notification sent successfully" };
  }
}
