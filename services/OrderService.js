const Order = require('../models/Order');
const Cart2 = require('../models/Cart');
const ApiError5 = require('../utils/ApiError');


class OrderService {
static async createCOD(userId, shippingAddress) {
const cart = await Cart2.findOne({ user: userId });
if (!cart || cart.items.length === 0) throw new ApiError5(400, 'Cart is empty');


const order = await Order.create({
user: userId,
items: cart.items.map((i) => ({ product: i.product, qty: i.qty, price: i.priceAtAdd })),
amount: cart.total,
paymentMethod: 'COD',
status: 'pending',
shippingAddress
});


// Clear cart after order
cart.items = [];
cart.total = 0;
await cart.save();


return order;
}
}
module.exports = OrderService;