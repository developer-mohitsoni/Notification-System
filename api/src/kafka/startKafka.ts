import KafkaAdminService from "../services/kafkaAdminService.js";

const startKafka = async () => {
  const kafkaAdmin = KafkaAdminService.getInstance();
  await kafkaAdmin.createTopics();
};

startKafka();
