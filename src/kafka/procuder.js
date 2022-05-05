const kafka = require('./index');

class KafkaProducer {
    constructor() {
        this.producer = kafka.producer();
    }

    async sendMessages(topic, messages) {
        await this.producer.connect();

        await this.producer.send({
          topic,
          messages
        });

        await this.producer.disconnect();
    }
}

module.exports = new KafkaProducer();
