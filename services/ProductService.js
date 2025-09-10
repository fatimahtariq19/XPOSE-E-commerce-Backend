const Product = require('../models/Product');
const QueryBuilder = require('../utils/query');
const ApiError3 = require('../utils/ApiError');


class ProductService {
static async create(payload) { return Product.create(payload); }


static async getBySlug(slug) {
const doc = await Product.findOne({ slug }).populate('category subcategory', 'name slug');
if (!doc) throw new ApiError3(404, 'Product not found');
return doc;
}


static async list(query) {
const qb = new QueryBuilder(Product.find({ isActive: true }).populate('category subcategory', 'name slug'), query)
.filter().sort().select().paginate();
return qb.query;
}
}
module.exports = ProductService;