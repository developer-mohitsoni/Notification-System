import { Kafka } from "kafkajs";
import "dotenv/config";

// Singleton Kafka client for managing connections
class KafkaClient {
  private static instance: Kafka;

  private constructor() {}

  public static getInstance(): Kafka {
    if (!KafkaClient.instance) {
      KafkaClient.instance = new Kafka({
        clientId: "init",
        brokers: [process.env.KAFKA_BROKERS!],
      });
    }
    return KafkaClient.instance;
  }
}

export default KafkaClient;
