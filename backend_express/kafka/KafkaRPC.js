const crypto = require('crypto');
const conn = require('./connection');
const topics = require('../topics');

var TIMEOUT = 8000;

class KafkaRPC {

  constructor() {
    this.connection = conn;
    this.requests = {};
    this.consumer = null;
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

    this.setupResponseQueue(() => {
      const payloads = [{
        topic,
        messages: JSON.stringify({
          correlationId,
          replyTo: topics.RESPONSE,
          data
        }),
        partition: 0
      }];

      this.producer.send(payloads, (err, data) => {
        if (err) {
          delete this.requests[correlationId];
          callback(err, null);
        }
        console.log(`Request Produced in Kafka: ${JSON.stringify(payloads)}`);
      });
    });
  }

  setupResponseQueue = (next) => {

    if (this.consumer === null) {
      this.consumer = this.connection.getConsumer(topics.RESPONSE);
      this.consumer.on('message', (message) => {
        console.log(`Response Consumed From Kafka: ${JSON.stringify(message)})`);

        const { data, correlationId } = JSON.parse(message);

        clearTimeout(this.requests[correlationId].timeout);
        delete this.requests[correlationId];
        entry.callback(null, data);
      });
    }

    return next();

  }

}

module.exports = KafkaRPC;
