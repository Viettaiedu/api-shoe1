
const express = require('express');
const productControllers = require('../controllers/productControllers');
const router = express.Router();
router.get('/other-brands', productControllers.getOtherBrands);
router.post('/', productControllers.createProduct);
router.get('/', productControllers.getAllProduct);
router.get('/:id', productControllers.getProductById);
module.exports = router;