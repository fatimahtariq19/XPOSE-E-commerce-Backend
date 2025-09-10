const router = require('express').Router();

// Auth Routes
router.use('/auth', require('./v1/auth.routes'));

// Catalog Routes (categories + subcategories + products)
router.use('/catalog', require('./v1/catalog.routes'));

// If you want cart and orders later, just uncomment these:
// router.use('/cart', require('./v1/cart.routes'));
// router.use('/orders', require('./v1/order.routes'));

module.exports = router;
