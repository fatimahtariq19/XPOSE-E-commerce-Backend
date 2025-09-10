// const asyncHandler3 = require('../utils/asyncHandler');
// const ProductService = require('../services/ProductService');
// const { productCreateSchema } = require('../../validation/schemas');


// exports.createProduct = asyncHandler3(async (req, res) => {
// const { value, error } = productCreateSchema.validate(req.body);
// if (error) throw error;
// const doc = await ProductService.create(value);
// res.status(201).json(doc);
// });


// exports.getProduct = asyncHandler3(async (req, res) => {
// const prod = await ProductService.getBySlug(req.params.slug);
// res.json(prod);
// });


// exports.listProducts = asyncHandler3(async (req, res) => {
// const list = await ProductService.list(req.query);
// res.json(list);
// });