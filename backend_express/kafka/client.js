const KafkaRPC = require('./KafkaRPC');
const rpc = new KafkaRPC();

const makeRequest = (topic, data, callback) => {
  rpc.makeRequest(topic, data, (error, response) => {
    if (error)
      callback(error, null);
    else {
      callback(null, response);
    }
  });
}

module.exports = { makeRequest };
