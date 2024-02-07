const { logger } = require("../helpers/logger");
const { success, error } = require("../helpers/helper");
const Subscribe = require("../models/subscribe")

exports.subscribe = async (req, res) => {
  logger.debug("Subscribing...");
  try {
    let data = req.body
    data.user = req.user
    await this.create(data);
    return success(res, 201, `New subscriber added:', ${req.body.url}`);
  } catch (err) {
    logger.error("🔥 error: %o", err);
    return error(res, 500, err);
  }
};

exports.create = async (data) => {
  const subscribe = await Subscribe.create(data)
  await subscribe.save()
}