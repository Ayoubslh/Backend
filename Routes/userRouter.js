const express =require('express');
const Router = express.Router();
const userControllers = require('../controllers/userControllers');
const authController=require('./../authControllers/authController')

Router.post('/signup',authController.signup)
Router.post('/login',authController.login)

Router.route('/').get(userControllers.getAllUsers).post(userControllers.createUser);
Router.route('/:id').get(userControllers.getUserById).patch(userControllers.updateUser).delete(userControllers.deleteUser);

module.exports= Router;