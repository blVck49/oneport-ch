const amqp = require("amqplib");
const { success, error } = require("../helpers/helper");
const { logger } = require("../helpers/logger");



exports.publishTask = async (data, routingKey) => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL);
        const channel = await connection.createChannel();
        const message = JSON.stringify(data);
        channel.publish(process.env.R_EXCHANGE_NAME, routingKey, Buffer.from(message), { persistent: true });
        logger.debug(`Sent task with data: ${data} and routing key: ${routingKey}`);
        setTimeout(() => {
            connection.close();
        }, 500);
    } catch (err) {
        logger.error("🔥 error: %o", err);
        return error(res, 500, err);
    }
}

