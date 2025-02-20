import KafkaClient from "../utils/kafkaClient.js";

// Factory Pattern for Creating Kafka Admin
class KafkaAdminService {
  private static instance: KafkaAdminService;
  private admin = KafkaClient.getInstance().admin();

  private constructor() {}

  public static getInstance(): KafkaAdminService {
    if (!KafkaAdminService.instance) {
      KafkaAdminService.instance = new KafkaAdminService();
    }
    return KafkaAdminService.instance;
  }

  public async createTopics(): Promise<void> {
    try {
      await this.admin.connect();
      console.log("Kafka Admin Client Connected!");

      const topicsToCreate = [
        {
          topic: "email",
          numPartitions: 3,
          replicationFactor: 3,
        },
        {
          topic: "sms",
          numPartitions: 3,
          replicationFactor: 3,
        },
        {
          topic: "whatsapp",
          numPartitions: 3,
          replicationFactor: 3,
        },
      ];

      const topics = await this.admin.listTopics();
      console.log("Existing topics: ", topics);

      const created = await this.admin.createTopics({ topics: topicsToCreate });
      console.log({ created });
    } catch (error) {
      console.error("Kafka Initialization Error: ", error);
    } finally {
      await this.admin.disconnect();
      console.log("Kafka Admin Client Disconnected!");
    }
  }
}

export default KafkaAdminService;
