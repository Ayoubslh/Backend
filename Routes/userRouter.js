const express =require('express');
const Router = express.Router();
const userControllers = require('../controllers/userControllers');
const authController=require('./../authControllers/authController')
//user functionalities
Router.route('/signup').post(authController.signup);
Router.route('/login').post(authController.login);
//admin functionalities
Router.route('/').get(userControllers.getAllUsers)
Router.route('/:id').get(userControllers.getUserById).delete(userControllers.deleteUser);


module.exports= Router;