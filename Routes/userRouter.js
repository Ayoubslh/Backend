const express =require('express');
const Router = express.Router();
const userControllers = require('../controllers/userControllers');
const authController=require('./../authControllers/authController')


Router.route('/signup').post(authController.signup);
Router.route('/login').post(authController.login);
Router.route('/updatecurrentuser').patch(authController.protect,userControllers.updateMe);
Router.route('/').get(userControllers.getAllUsers)
Router.route('/:id').get(userControllers.getUserById).delete(userControllers.deleteUser);




Router.post('/signup',authController.signup)
Router.post('/login',authController.login)

Router.route('/').get(userControllers.getAllUsers)
Router.route('/:id').get(userControllers.getUserById).patch(userControllers.updateMe).delete(userControllers.deleteUser);

module.exports= Router;