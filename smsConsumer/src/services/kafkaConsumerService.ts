import KafkaClient from "../utils/kafkaClient";

class KafkaConsumerService {
  private static instance: KafkaConsumerService;
  private consumer = KafkaClient.getInstance().consumer({
    groupId: "sms-group",
  });

  private constructor() {}

  public static getInstance(): KafkaConsumerService {
    if (!KafkaConsumerService.instance) {
      KafkaConsumerService.instance = new KafkaConsumerService();
    }
    return KafkaConsumerService.instance;
  }

  public async consumeMessages(
    topic: string,
    callback: (message: any) => void
  ): Promise<void> {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic, fromBeginning: true });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          partition,
          offset: message.offset,
          value: message.value?.toString(),
        });

        const parsedData = JSON.parse(message.value?.toString() || "{}");
        callback(parsedData); //  Message milne par callback function call hoga
      },
    });
  }
}

export default KafkaConsumerService;
