import { Kafka } from "kafkajs";

class KafkaClient {
  private static instance: Kafka;

  private constructor() {}

  public static getInstance(): Kafka {
    if (!KafkaClient.instance) {
      KafkaClient.instance = new Kafka({
        clientId: "whatsAppInit",
        brokers: [process.env.KAFKA_BROKER!],
      });
    }
    return KafkaClient.instance;
  }
}

export default KafkaClient;
