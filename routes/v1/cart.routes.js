const router = require('express').Router();
const {
  createCategory,
  getCategories,
  createSubcategory,
  getSubcategories,
} = require('../controllers/category.controller');

// Categories
router.post('/categories', createCategory); // Add Men, Women
router.get('/categories', getCategories);

// Subcategories
router.post('/subcategories', createSubcategory); // Add loafers, sneakers etc
router.get('/categories/:categoryId/subcategories', getSubcategories);

module.exports = router;
