import { Router, Request, Response } from "express";
import prisma from "../db/db.js";
import { NotificationService } from "../services/NotificationService.js";

const router: Router = Router();

// Dependency Injection
const notificationService = new NotificationService(prisma);

router.post(
  "/notification",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId, message } = req.body;

      if (!userId || !message) {
        res.status(400).json({ message: "userId and message are required" });
      }

      const response = await notificationService.sendNotification(
        Number(userId),
        message
      );
      res.status(201).json(response);
    } catch (error: any) {
      console.error("Error sending notification:", error);
      res
        .status(500)
        .json({ error: error.message, message: "Failed to send notification" });
    }
  }
);

export default router;
