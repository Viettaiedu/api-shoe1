const express  = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

// [GET]
router.get('/login' , accountController.checkLogin,accountController.admin ,accountController.login , accountController.error);
router.get('/' , accountController.account);


// [POST]
router.post('/signup' , accountController.checkSignUp,accountController.signup );



module.exports = router;