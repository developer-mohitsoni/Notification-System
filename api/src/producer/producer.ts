import { Kafka, Producer } from "kafkajs";
import { SendMessage } from "../index.js";

class KafkaService {
  private static instance: KafkaService;
  private kafka: Kafka;
  private producer: Producer;

  private constructor() {
    this.kafka = new Kafka({
      clientId: "notification-service",
      brokers: [process.env.KAFKA_BROKERS!],
    });
    this.producer = this.kafka.producer();
  }
  static getInstance(): KafkaService {
    if (!KafkaService.instance) {
      KafkaService.instance = new KafkaService();
    }
    return KafkaService.instance;
  }
  async sendMessage({ topic, message, to }: SendMessage): Promise<void> {
    await this.producer.connect();
    await this.producer.send({
      topic,
      messages: [
        {
          value: JSON.stringify({
            to,
            message,
          }),
        },
      ],
    });
    console.log(`📤 Message sent to ${topic}: ${message}`);
  }
}

// ✅ Singleton Instance
const kafkaService = KafkaService.getInstance();
export { kafkaService };
