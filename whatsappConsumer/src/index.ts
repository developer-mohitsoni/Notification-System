import KafkaConsumerService from "./services/kafkaConsumerService";
import WhatsAppService from "./services/whatsappService";

const startConsumer = async () => {
  const kafkaConsumer = KafkaConsumerService.getInstance();
  const whatsappService = WhatsAppService.getInstance();

  await kafkaConsumer.consumeMessages("whatsapp", (parsedData) => {
    const { to, message } = parsedData;
    whatsappService.sendWhatsAppMessage(to, message);
  });
};

startConsumer().catch(console.error);
