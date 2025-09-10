const asyncHandler4 = require('../utils/asyncHandler');
const CartService = require('../services/CartService');


exports.getCart = asyncHandler4(async (req, res) => {
res.json(await CartService.getOrCreate(req.user._id));
});


exports.addToCart = asyncHandler4(async (req, res) => {
const { productId, qty } = req.body;
res.json(await CartService.addItem(req.user._id, productId, qty || 1));
});


exports.removeFromCart = asyncHandler4(async (req, res) => {
const { productId } = req.body;
res.json(await CartService.removeItem(req.user._id, productId));
});