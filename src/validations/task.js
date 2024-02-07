const Joi = require('joi');

const createSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
});

module.exports = { createSchema }