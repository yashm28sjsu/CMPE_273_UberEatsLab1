const crypto = require('crypto');
const conn = require('./connection');
const topics = require('../topics');

const TIMEOUT = 8000;

class KafkaRPC {

  constructor() {
    this.connection = conn;
    this.requests = {};
    this.producer = this.connection.getProducer();
  }

  makeRequest = (topic, data, callback) => {

    const correlationId = crypto.randomBytes(16).toString('hex');

    const timeout = setTimeout((correlationId) => {
      callback("Timeout Error", null);
      delete this.requests[correlationId];
    }, TIMEOUT, correlationId);

    const entry = { callback, timeout };
    this.requests[correlationId] = entry;
    this.consumer = this.connection.setConsumer(
      topic,
      this.setupResponseQueue
    );
    this.enqueueRequestToKafka(topic, correlationId, data)
  };

  enqueueRequestToKafka = (topic, correlationId, data) => {
    const payloads = [{
      topic,
      messages: JSON.stringify({
        correlationId,
        replyTo: topics.RESPONSE,
        data
      }),
      partition: 0
    }];

    this.producer.send(payloads, (err, _) => {
      if (err) {
        delete this.requests[correlationId];
        callback(err, null);
      }
      console.log(`Request Produced in Kafka: ${JSON.stringify(payloads)}`);
    });
  };

  setupResponseQueue = (message) => {
    console.log(`Response Consumed From Kafka: ${JSON.stringify(message)})`);

    const { response, correlationId } = JSON.parse(message.value);
    console.log(correlationId + " " + JSON.stringify(response));
    const entry = this.requests[correlationId];
    if (entry) {
      clearTimeout(entry.timeout);
      delete this.requests[correlationId];
      entry.callback(null, response);
    }
  }
}

module.exports = KafkaRPC;
