const { KafkaClient, Consumer, HighLevelProducer, Offset } = require('kafka-node');

class ConnectionProvider {

    constructor() {
        if (ConnectionProvider._connection) {
            return ConnectionProvider._connection;
        }
        ConnectionProvider._connection = this;
        this._client = new KafkaClient("localhost:2181");
        this._client.on('ready', () => console.log('Kafka Client is now ready...'));
    }

    getConsumer = (topic) => {
        return new Consumer(this._client, [{ topic, partition: 0, fromOffset: -1 }]);
    }

    getProducer = () => {
        if (!this.producer) {
            this.producer = new HighLevelProducer(this._client);
        }
        return this.producer;
    }

}

module.exports = new ConnectionProvider();