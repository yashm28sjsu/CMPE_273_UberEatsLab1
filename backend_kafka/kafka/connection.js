const {
  KafkaClient, Consumer, HighLevelProducer, Offset,
} = require('kafka-node');

class ConnectionProvider {
  // eslint-disable-next-line class-methods-use-this
  setConsumer(topic, route, handleRequest) {
    const client = new KafkaClient('localhost:2181');
    client.on('ready', () => console.log('Kafka Client is now ready...'));
    const offset = new Offset(client);

    offset.fetch([{ topic, partition: 0, time: -1 }], (_err, data) => {
      const latestOffset = data[topic]['0'][0];
      console.log(`Consumer current offset: ${topic} ${latestOffset}`);
      const consumer = new Consumer(
        client,
        [{ topic, partition: 0, offset: latestOffset }],
        { autoCommit: false, fromOffset: true },
      );
      console.log(`Server is listening to topic ${topic}...`);

      consumer.on('error', (error) => {
        console.log(error);
      });

      consumer.on('offsetOutOfRange', () => console.log('Offset Out Of Range'));
      consumer.on('message', (message) => handleRequest(message, route, topic));
    });
  }

  getProducer() {
    const client = new KafkaClient('localhost:2181');
    client.on('ready', () => console.log('Kafka Client is now ready...'));
    if (!this.producer) {
      this.producer = new HighLevelProducer(client);
    }
    return this.producer;
  }
}

module.exports = new ConnectionProvider();
