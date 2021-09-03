var express = require('express');
var UserControllerData = require('../src/user/userController');
var schemaUserValidation = require('../src/user/schemaUaerValidation');
var authServiceData = require('../services/authService');
var router = express.Router();

// User Create...
router.route('/user/create')
    .post(authServiceData.validateToken, schemaUserValidation.validateFullUserBody, UserControllerData.createUserControllerFunc);

// User login...
router.route('/user/login')
    .post(UserControllerData.loginUserControllerFunc);


// User update...
router.route('/user/update/:id')
    .patch(UserControllerData.updateUserControllerFunc);


// User delete...
router.route('/user/delete/:id')
    .delete(UserControllerData.deleteUserControllerFunc);


    
// User getAll...
router.route('/user/getAll')
    .get(UserControllerData.getAllUserControllerFunc);




module.exports = router;