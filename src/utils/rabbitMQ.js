const amqp = require("amqplib");
const { createTask, updateTask } = require("../controllers/task")
const { success, error } = require("../helpers/helper");
const { logger } = require("../helpers/logger");

const taskExchangeName = process.env.R_EXCHANGE_NAME
const webhookExchangeName = process.env.W_EXCHANGE_NAME
const workerQueues = ['create', 'update'];

exports.TaskQueue = async () => {
    let connection;
    try {
        connection = await amqp.connect(process.env.RABBITMQ_URL);
        const channel = await connection.createChannel();

        //Declare queues and bind them to the exchange
        await Promise.all(workerQueues.map(async (queue) => {
            await channel.assertQueue(queue, { durable: true });
            await channel.bindQueue(queue, taskExchangeName, queue);
        }))


        //Consume messages from each queue concurrently
        await Promise.all(workerQueues.map(async (queue) => {
            channel.consume(queue, async (msg) => {
            const message = JSON.parse(msg.content.toString());
            logger.debug(`Received message in ${queue}: ${message}`);
            switch (queue) {
                case 'create':
                  await createTask(message);
                  break;
                case 'update':
                  await updateTask(message);
                  break;
                default:
                  console.warn('Unknown task type:', message.type);
                  break;
            }
            logger.debug(`Processed message in ${queue}: ${queue} task`);
            channel.ack(msg);
            });
        }));

    } catch (err) {
        logger.error("🔥 error: %o", err);
        return error(res, 500, err);
    } 
}

exports.setupWebhook = async() => {

    try {
        connection = await amqp.connect(process.env.RABBITMQ_URL);
        const channel = await connection.createChannel();

        await channel.assertExchange(webhookExchangeName, 'fanout', { durable: false });
        
    } catch (error) {
        
    }
     
}



