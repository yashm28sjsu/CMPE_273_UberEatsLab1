const mongoose = require('mongoose');
const connection = require('./kafka/connection');
const topics = require('./topics');
const dbconfig = require('./config/config.json');

const user = require('./controllers/user');
const restaurant = require('./controllers/restaurant');

const handleRequest = (message, route, topic) => {
  const producer = connection.getProducer();

  console.log(`Received new message: ${topic} ${JSON.stringify(message.value)}`);
  const { data, correlationId } = JSON.parse(message.value);

  route.handleRequest(topic, data, (error, response) => {
    producer.send(
      [{
        topic: topics.RESPONSE,
        messages: JSON.stringify({ correlationId, response: error || response }),
        partition: 0,
      }],
      (producerError, producerData) => console.log(`Produced Response: ${JSON.stringify(producerData)} ${producerError}`),
    );
  });
};

const main = async () => {
  await mongoose.connect(dbconfig.development.url);
  console.log('Database Connected');
  connection.setConsumer(topics.USER_CREATE, user, handleRequest);
  connection.setConsumer(topics.USER_UPDATE, user, handleRequest);
  connection.setConsumer(topics.USER_LOGIN, user, handleRequest);
  connection.setConsumer(topics.RESTAURANT_CREATE, restaurant, handleRequest);
  connection.setConsumer(topics.RESTAURANT_LOGIN, restaurant, handleRequest);
  connection.setConsumer(topics.RESTAURANT_GETALL, restaurant, handleRequest);
  connection.setConsumer(topics.RESTAURANT_UPDATE, restaurant, handleRequest);
};

main();
