import KafkaConsumerService from "./services/kafkaConsumerService";
import SMSService from "./services/SMSService";
import "dotenv/config";

const startConsumer = async () => {
  const kafkaConsumer = KafkaConsumerService.getInstance();
  const smsService = SMSService.getInstance();

  await kafkaConsumer.consumeMessages("sms", (parsedData) => {
    const { to, message } = parsedData;
    smsService.sendSMS(to, message);
  });
};

startConsumer().catch(console.error);
