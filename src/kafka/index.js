const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: process.env.APP_NAME,
  brokers: ['host.docker.internal:9094'],
})

module.exports = kafka;