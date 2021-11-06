const mongoose = require('mongoose');
const connection = require('./kafka/Connection');
const topics = require('./topics');
const dbconfig = require('./config/config.json');

const user = require('./controllers/user');

const getPayload = (type, topic, correlationId, response) => {
  let payload = [{
    topic,
    messages: { correlationId },
    'partition': 0,
  }];
  if (type === 'error') payload[0].messages.error = response;
  else payload[0].messages.data = response;
  return payload;
}

const handleRequest = (topic, route) => {

  const consumer = connection.getConsumer(topic);
  const producer = connection.getProducer();

  console.log(`Server is listening to topic ${topic}...`);

  consumer.on('error', (error) => {
    console.log(error);
  });

  consumer.on('offsetOutOfRange', () => console.log("Offset Out Of Range"));
  consumer.on('message', (message) => {

    console.log(`Received new message: ${JSON.stringify(message.value)}`);
    const { data, correlationId } = JSON.parse(message.value);

    route.handleRequest(topic, data, (error, response) => {
      if (error) {
        producer.send(getPayload('error', topic, correlationId, error));
      } else {
        producer.send(getPayload('success', topic, correlationId, response));
      }
    })

  });

}

const main = async () => {

  await mongoose.connect(dbconfig.development.url);
  handleRequest(topics.USER_CREATE, user);
  handleRequest(topics.USER_UPDATE, user);
  handleRequest(topics.USER_LOGIN, user);

}

main().then(() => console.log("Database Connected..."));
