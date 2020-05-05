/*
 * @Description: 
 * @Version: 1.0
 * @Autor: Tianshi
 * @Date: 2020-05-03 04:12:36
 * @LastEditors: Tianshi
 * @LastEditTime: 2020-05-04 19:08:34
 */

var express = require('express');
var router = express.Router();


const userController = require('../controller/userController.js');

router.post('/login/', userController.login);
router.post('/signup/', userController.signup);
router.post('/collect/', userController.collect);

module.exports = router;