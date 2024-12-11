const express = require('express');
const Router = express.Router();
const expertController = require('../controllers/expertController');
const expertAuthController = require('../authControllers/expertAuthController');
const authController = require('./../authControllers/authController')
Router.route('/').get(expertController.getAllExperts);
Router.route('/:id').get(expertAuthController.protect, expertController.getExpertById).patch(expertAuthController.protect, expertController.updateExpertMe).delete(authController.protect, authController.restrictTo('admin'), expertController.deleteExpertMe);
Router.route('/signup').post(expertAuthController.signup);
Router.route('/login').post(expertAuthController.login);
module.exports = Router;