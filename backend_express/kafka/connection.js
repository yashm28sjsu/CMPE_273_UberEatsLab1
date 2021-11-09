const {
  KafkaClient, Consumer, HighLevelProducer, Offset,
} = require('kafka-node');
const topics = require('../topics');

class ConnectionProvider {
  constructor() {
    if (ConnectionProvider.connection) {
      return ConnectionProvider.connection;
    }
    ConnectionProvider.connection = this;
    this.client = new KafkaClient('localhost:2181');
    this.client.on('ready', () => console.log('Kafka Client is now ready...'));
  }

  setConsumer(topic, callback) {
    const offset = new Offset(this.client);

    offset.fetch([{ topic: topics.RESPONSE, partition: 0, time: -1 }], (_err, data) => {
      const latestOffset = data[topics.RESPONSE]['0'][0];
      console.log(`Consumer current offset: ${latestOffset}`);
      const consumer = new Consumer(
        this.client,
        [{ topic: topics.RESPONSE, partition: 0, offset: latestOffset }],
        { autoCommit: false, fromOffset: true },
      );
      console.log(`Server is listening to topic ${topics.RESPONSE}...`);

      consumer.on('error', (error) => {
        console.log(error);
      });

      consumer.on('offsetOutOfRange', () => console.log('Offset Out Of Range'));
      consumer.on('message', (message) => callback(message));
    });
  }

  getProducer() {
    if (!this.producer) {
      this.producer = new HighLevelProducer(this.client);
    }
    return this.producer;
  }
}

module.exports = new ConnectionProvider();
