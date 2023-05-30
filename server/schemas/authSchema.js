const Joi = require('joi');

const registerSchema = Joi.object({
  username: Joi.string().required().min(3),
  password: Joi.string().required().min(6),
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};
