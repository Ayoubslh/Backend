const express = require('express');
const Router = express.Router();
const userControllers = require('../controllers/userControllers');
const authController = require('./../authControllers/authController')


Router.post('/signup', authController.signup)

Router.post('/login', authController.login)

//admin functionalities
Router.route('/').get(userControllers.getAllUsers)
// Router.route('/:id').get(userControllers.getUserById).delete(userControllers.deleteUser);





Router.route('/:id').get(userControllers.getUserById).patch(userControllers.updateMe).delete(userControllers.deleteUser);




module.exports = Router;