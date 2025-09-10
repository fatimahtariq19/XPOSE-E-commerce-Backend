const asyncHandler5 = require('../utils/asyncHandler');
const OrderService = require('../services/OrderService');


exports.createCOD = asyncHandler5(async (req, res) => {
const order = await OrderService.createCOD(req.user._id, req.body.shippingAddress || {});
res.status(201).json(order);
});