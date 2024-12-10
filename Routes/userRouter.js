const express =require('express');
const Router = express.Router();
const userControllers = require('../controllers/userControllers');
Router.route('/').get(userControllers.getAllUsers).post(userControllers.createUser);
Router.route('/:id').get(userControllers.getUserById).patch(userControllers.updateUser).delete(userControllers.deleteUser);


module.exports= Router;