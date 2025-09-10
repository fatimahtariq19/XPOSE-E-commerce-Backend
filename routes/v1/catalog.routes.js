const router = require('express').Router();
const {
  createCategory,
  getCategories,
  createSubcategory,
  getSubcategories,
} = require('../v1/catalog.routes');

// Categories
router.post('/categories', createCategory); // Add Men, Women
router.get('/categories', getCategories);

// Subcategories
router.post('/subcategories', createSubcategory); // Add loafers, sneakers etc
router.get('/categories/:categoryId/subcategories', getSubcategories);

module.exports = router;
