const mongoose6 = require('mongoose');


const orderSchema = new mongoose6.Schema(
{
user: { type: mongoose6.Schema.Types.ObjectId, ref: 'User', required: true },
items: [
{
product: { type: mongoose6.Schema.Types.ObjectId, ref: 'Product', required: true },
qty: { type: Number, required: true },
price: { type: Number, required: true }
}
],
amount: { type: Number, required: true },
status: { type: String, enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
paymentMethod: { type: String, enum: ['COD', 'CARD'], default: 'COD' },
shippingAddress: {
name: String,
phone: String,
address1: String,
city: String,
country: { type: String, default: 'Pakistan' },
zip: String
}
},
{ timestamps: true }
);


module.exports = mongoose6.model('Order', orderSchema);



// const mongoose = require('mongoose');

// const orderItemSchema = new mongoose.Schema({
//   product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
//   quantity: Number,
//   size: String,
//   color: String,
// });

// const orderSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   orderItems: [orderItemSchema],
//   shippingAddress: {
//     address: String,
//     city: String,
//     postalCode: String,
//     country: String
//   },
//   paymentMethod: String,
//   paymentResult: {
//     id: String,
//     status: String,
//     update_time: String,
//     email_address: String
//   },
//   totalPrice: Number,
//   isPaid: { type: Boolean, default: false },
//   paidAt: Date,
//   isDelivered: { type: Boolean, default: false },
//   deliveredAt: Date
// }, { timestamps: true });

// module.exports = mongoose.model('Order', orderSchema);
