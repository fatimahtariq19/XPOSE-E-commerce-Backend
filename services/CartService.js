const Cart = require('../models/Cart');
const Product2 = require('../models/Product');
const ApiError4 = require('../utils/ApiError');


class CartService {
static async getOrCreate(userId) {
let cart = await Cart.findOne({ user: userId }).populate('items.product', 'name slug images price');
if (!cart) cart = await Cart.create({ user: userId, items: [], total: 0 });
return cart;
}


static async addItem(userId, productId, qty = 1) {
const product = await Product2.findById(productId);
if (!product || !product.isActive) throw new ApiError4(404, 'Product not available');


const cart = await this.getOrCreate(userId);
const existing = cart.items.find((i) => i.product.toString() === productId);
if (existing) {
existing.qty += qty;
} else {
cart.items.push({ product: product._id, qty, priceAtAdd: product.price.sale });
}
cart.total = cart.items.reduce((sum, i) => sum + i.qty * i.priceAtAdd, 0);
await cart.save();
return cart;
}


static async removeItem(userId, productId) {
const cart = await this.getOrCreate(userId);
cart.items = cart.items.filter((i) => i.product.toString() !== productId);
cart.total = cart.items.reduce((sum, i) => sum + i.qty * i.priceAtAdd, 0);
await cart.save();
return cart;
}
}
module.exports = CartService;


