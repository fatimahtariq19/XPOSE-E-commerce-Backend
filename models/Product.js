const mongoose4 = require('mongoose');
const slugify3 = require('slugify');


const priceSchema = new mongoose4.Schema(
{
mrp: { type: Number, required: true },
sale: { type: Number, required: true },
currency: { type: String, default: 'PKR' }
},
{ _id: false }
);


const inventorySchema = new mongoose4.Schema(
{
sku: { type: String, required: true, unique: true },
size: [{ type: String }], // e.g., 39, 40, 41 ...
color: { type: String },
quantity: { type: Number, default: 0, min: 0 }
},
{ _id: false }
);


const productSchema = new mongoose4.Schema(
{
name: { type: String, required: true, trim: true },
slug: { type: String, unique: true },
category: { type: mongoose4.Schema.Types.ObjectId, ref: 'Category', required: true },
subcategory: { type: mongoose4.Schema.Types.ObjectId, ref: 'Subcategory', required: true },
description: { type: String },
price: { type: priceSchema, required: true },
inventory: { type: inventorySchema, required: true },
images: [{ url: String, alt: String }],
ratingAvg: { type: Number, default: 0, min: 0, max: 5 },
ratingCount: { type: Number, default: 0 },
isActive: { type: Boolean, default: true }
},
{ timestamps: true }
);


productSchema.index({ name: 'text', slug: 'text', description: 'text' });
productSchema.index({ category: 1, subcategory: 1 });
productSchema.index({ 'price.sale': 1 });


productSchema.pre('save', function (next) {
if (!this.isModified('name')) return next();
this.slug = slugify3(this.name, { lower: true });
next();
});


module.exports = mongoose4.model('Product', productSchema);




// const mongoose = require('mongoose');
// const productSchema = new mongoose.Schema({
//     name:{type:String, required:true},
//     description:{type:String},
//     price:{type:String,required:true},
//     category:{type:mongoose.Schema.Types.ObjectId, ref:'Category'},
//     sizes:[String],
//     color:[String],
//     countInStock:{type:Number, default:0},
//     images:[String],
//     rating:{type:Number ,default:0},
//     numbersOfReviews :{type:Number ,default:0},
//   createdBy: { type: String }, 

// }, {timestamps:true});


// module.exports= mongoose.model("Product",productSchema)