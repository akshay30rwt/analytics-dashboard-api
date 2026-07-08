const Joi = require('joi');

const recordSchema = Joi.object({
    product: Joi.string().min(3).max(100).required(),
    category: Joi.string().valid('Electronics', 'Clothing', 'Food', 'Books', 'Other').required(),
    amount: Joi.number().min(0).required(),
    quantity: Joi.number().min(1).required(),
    region: Joi.string().valid('North', 'South', 'East', 'West').required(),
    soldBy: Joi.string().min(2).max(100).required()
});

module.exports = { recordSchema };