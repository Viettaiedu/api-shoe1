const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController')
// [GET]/api/cart
router.get('/',cartController.getCart);
router.post('/',cartController.addCart);
router.delete('/:id',cartController.removeProductFromCart);
module.exports = router;