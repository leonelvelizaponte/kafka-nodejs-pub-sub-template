require('dotenv').config()
const { Kafka } = require('kafkajs')
const logger = require('node-color-log')

const {
    NODE_ENV,
    KAFKA_CLIENT_ID,
    KAFKA_BROKERS,
    KAFKA_USERNAME,
    KAFKA_PASSWORD,
    KAFKA_GROUP_ID,
    KAFKA_ACTION,
    KAFKA_TOPIC_1,
    KAFKA_TOPIC_2
} = process.env

const groupId = KAFKA_GROUP_ID
    ? `${KAFKA_GROUP_ID}:${KAFKA_ACTION}:${NODE_ENV}`
    : `${KAFKA_CLIENT_ID}:${KAFKA_ACTION}:${NODE_ENV}`

const kafka = new Kafka({
    clientId: KAFKA_CLIENT_ID,
    brokers: [KAFKA_BROKERS],
    ssl: true,
    sasl: {
        mechanism: 'plain',
        username: KAFKA_USERNAME,
        password: KAFKA_PASSWORD,
    },
})

const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: groupId })

const kafkaConsumer = async () => {
    logger.color('magenta').bgColor('white').reverse().log('[[[[  Kafka Consumer  ]]]]')
    await consumer.connect()
    await consumer.subscribe({ topic: KAFKA_TOPIC_1 })
    await consumer.subscribe({ topic: KAFKA_TOPIC_2 })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            logger.color('blue').bgColor('white').reverse().log(`>>>>>> Topic: ${topic}`)
            logger.info({
                // topic,
                // partition,
                // offset: message.offset,
                value: message.value.toString(),
            })
        },
    })
}

const kafkaPublish = async () => {
    logger.color('magenta').bgColor('white').reverse().log('[[[[  Kafka Publisher  ]]]]')
    await producer.connect()
    await producer.send({
        topic: KAFKA_TOPIC_1,
        messages: [
            { value: '{ "msg":"A" }' },
        ],
    })

    await producer.send({
        topic: KAFKA_TOPIC_2,
        messages: [
            { value: '{ "msg":"B" }' },
        ],
    })

    logger.success('All msg sended!')
}

switch (KAFKA_ACTION) {
    case 'CONSUMER':

        kafkaConsumer().catch(logger.error)

        break;
    case 'PUBLISHER':

        kafkaPublish().catch(logger.error)

        break;
    default:
        logger.warn('Check KAFKA_ACTION in enviroment file')
}
