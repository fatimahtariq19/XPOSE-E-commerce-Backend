const mongoose5 = require('mongoose');


const cartItemSchema = new mongoose5.Schema(
{
product: { type: mongoose5.Schema.Types.ObjectId, ref: 'Product', required: true },
qty: { type: Number, default: 1, min: 1 },
priceAtAdd: { type: Number, required: true }
},
{ _id: false }
);


const cartSchema = new mongoose5.Schema(
{
user: { type: mongoose5.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
items: [cartItemSchema],
total: { type: Number, default: 0 }
},
{ timestamps: true }
);


module.exports = mongoose5.model('Cart', cartSchema);



// const mongoose = require('mongoose');

// const cartItemSchema = new mongoose.Schema({
//   product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
//   quantity: { type: Number, required: true },
//   size: { type: String },
//   color: { type: String }
// });

// const cartSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   items: [cartItemSchema]
// }, { timestamps: true });

// module.exports = mongoose.model('Cart', cartSchema);
