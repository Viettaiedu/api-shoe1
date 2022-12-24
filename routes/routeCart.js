const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController')
const checkAuthMiddleware = require('../middleware/checkAuth');
// [GET]/api/cart


router.get('/',checkAuthMiddleware.checkAuth,cartController.getCart);
router.post('/', checkAuthMiddleware.checkAuth, cartController.addCart);
router.delete('/:id',checkAuthMiddleware.checkAuth, cartController.removeProductFromCart);
module.exports = router;