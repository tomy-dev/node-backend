const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(200);
const price = Joi.number().integer().min(10);

const createProductSchema = Joi.object({
    name: name.required(),
    price: price.required(),
    image: Joi.string().uri().required()
});
const updateProductSchema = Joi.object({
    name: name,
    price: price,  
});

const getProductSchema = Joi.object({
    id: id.required()
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema };