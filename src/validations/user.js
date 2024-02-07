const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const User = require("../models/user");
const { success, error } = require("../helpers/helper")

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
});

const loginSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
});

const validateRegistration = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        return error(res, 404, "User already exists");
    }
    next();
}

const validateLogin = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return error(res, 404, "User does not exist");
    }
    res.locals.user = user
    next();
}


module.exports = { registerSchema, loginSchema, validateRegistration, validateLogin }