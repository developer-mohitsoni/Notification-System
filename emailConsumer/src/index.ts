import KafkaConsumerService from "./services/kafkaConsumerService";
import EmailService from "./services/EmailService";

const startConsumer = async () => {
  const kafkaConsumer = KafkaConsumerService.getInstance();
  const emailService = EmailService.getInstance();

  await kafkaConsumer.consumeMessages("email", (parsedData) => {
    const { to, message } = parsedData;
    emailService.sendEmail(to, message);
  });
};

startConsumer().catch(console.error);
