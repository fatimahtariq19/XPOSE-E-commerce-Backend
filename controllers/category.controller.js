const asyncHandler2 = require('../utils/asyncHandler');
const CategoryService = require('../services/CategoryService');


const getCategories = asyncHandler2(async (_req, res) => {
res.json(await CategoryService.listCategories());
});


const createCategory = asyncHandler2(async (req, res) => {
const cat = await CategoryService.createCategory(req.body.name);
res.status(201).json(cat);
});


const getSubcategories = asyncHandler2(async (req, res) => {
res.json(await CategoryService.listSubcategories(req.params.categoryId));
});


const createSubcategory = asyncHandler2(async (req, res) => {
const sub = await CategoryService.createSubcategory({ name: req.body.name, category: req.body.category });
res.status(201).json(sub);
});

module.exports={
    createCategory,
    getCategories,
    createSubcategory,
    getSubcategories
}