const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// [GET]/api/user
router.get('/' , userController.index);

// [GET]/api/user
router.post('/' , userController.save);
router.post('/login' , userController.login);
router.post('/check-email' , userController.show);

// [PATCH]/api/user/:id
router.patch('/:id' , userController.update);

// [DELETE]/api/user/:id

router.delete('/:id' , userController.destroy);
module.exports = router;