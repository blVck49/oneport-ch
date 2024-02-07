const amqp = require("amqplib");
const { success, error } = require("../helpers/helper");
const axios = require("axios")
const { logger } = require("../helpers/logger");
const Subscribe = require("../models/subscribe")



exports.notifySubscribers = async (eventType, data) => {
    try {
        logger.debug("Notify subscribers");
        const subscribers = await Subscribe.find();
        for (const subscriber of subscribers) {
            await axios.post(subscriber.url, data);
            logger.debug(`Notified subscriber at ${subscriber.url} about ${eventType}`);
        }
    } catch (err) {
        logger.error("🔥 error: %o", err);
        return error(res, 500, `Error notifying subscriber ${err}`);
    }
}

