const Joi = require('joi');

const subscribeSchema = Joi.object({
    url: Joi.string().required().uri(),
});

module.exports = { subscribeSchema }