const { Kafka } = require('kafkajs')
const kafkaConfig = require('../config/kafka');

const kafka = new Kafka({
  clientId: process.env.APP_NAME,
  brokers: kafkaConfig.kafkaBrokers,
})

module.exports = kafka;