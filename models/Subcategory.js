const mongoose3 = require('mongoose');
const slugify2 = require('slugify');


const subcategorySchema = new mongoose3.Schema(
{
name: { type: String, required: true, trim: true }, // e.g. loafers, sandals
slug: { type: String, index: true },
category: { type: mongoose3.Schema.Types.ObjectId, ref: 'Category', required: true },
},
{ timestamps: true }
);


subcategorySchema.index({ name: 1, category: 1 }, { unique: true });


subcategorySchema.pre('save', function (next) {
if (!this.isModified('name')) return next();
this.slug = slugify2(this.name, { lower: true });
next();
});


module.exports = mongoose3.model('Subcategory', subcategorySchema);