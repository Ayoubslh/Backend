const express = require('express');
const Router = express.Router();
const userControllers = require('../controllers/userControllers');
const authController = require('./../authControllers/authController')
const insurerRouter = require('./insurerRouter');

Router.post('/signup', authController.signup)

Router.post('/login', authController.login)

//admin functionalities
Router.route('/').get(authController.protect, authController.restrictTo(['admin']), userControllers.getAllUsers)
Router.route('/:id').get(authController.protect, authController.restrictTo(['admin']), authController.restrictTo(['admin']), userControllers.getUserById).patch(authController.protect, userControllers.updateMe).delete(authController.protect, userControllers.deleteUser);
//user functionalities
Router.route('/updateme').patch(authController.protect, userControllers.updateMe);
//buy plan route
Router.route('/insurer/:insurerId', insurerRouter);


module.exports = Router;