const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');
const ApiError2 = require('../utils/ApiError');


class CategoryService {
static async listCategories() { return Category.find().sort('name'); }
static async createCategory(name) { return Category.create({ name }); }
static async listSubcategories(categoryId) { return Subcategory.find({ category: categoryId }).sort('name'); }
static async createSubcategory({ name, category }) {
const cat = await Category.findById(category);
if (!cat) throw new ApiError2(404, 'Parent category not found');
return Subcategory.create({ name, category });
}
}
module.exports = CategoryService;