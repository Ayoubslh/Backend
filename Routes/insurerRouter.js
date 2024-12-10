const express = require('express');
const insurerController = require('./../controllers/insurerController');
const authController = require('./../authControllers/authController')

const Router = express.Router();

Router.route('/').get(insurerController.getInsurer).post(insurerController.creatInsurer);
Router.route('/plan').post(insurerController.creatPlan).get(insurerController.getPlan)

module.exports = Router
