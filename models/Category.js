const mongoose2 = require('mongoose');
const slugify = require('slugify');


const categorySchema = new mongoose2.Schema(
{
name: { type: String, required: true, unique: true, trim: true }, // Men, Women
slug: { type: String, unique: true },
},
{ timestamps: true }
);


categorySchema.pre('save', function (next) {
if (!this.isModified('name')) return next();
this.slug = slugify(this.name, { lower: true });
next();
});


module.exports = mongoose2.model('Category', categorySchema);




// const mongoose = require('mongoose');

// const categorySchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     unique: true, 
//     enum: ['Men', 'Women', 'Kids'] 
//   },
 
// }, { timestamps: true });

// module.exports = mongoose.model('Category', categorySchema);
