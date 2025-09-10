const Joi = require('joi');


const registerSchema = Joi.object({
name: Joi.string().min(2).required(),
email: Joi.string().email().required(),
password: Joi.string().min(6).required()
});


const loginSchema = Joi.object({
email: Joi.string().email().required(),
password: Joi.string().required()
});


const productCreateSchema = Joi.object({
name: Joi.string().required(),
category: Joi.string().required(),
subcategory: Joi.string().required(),
description: Joi.string().allow(''),
price: Joi.object({ mrp: Joi.number().required(), sale: Joi.number().required(), currency: Joi.string().default('PKR') }),
inventory: Joi.object({ sku: Joi.string().required(), size: Joi.array().items(Joi.string()), color: Joi.string().allow(''), quantity: Joi.number().min(0).default(0) }),
images: Joi.array().items(Joi.object({ url: Joi.string().uri(), alt: Joi.string().allow('') }))
});


module.exports = { registerSchema, loginSchema, productCreateSchema };