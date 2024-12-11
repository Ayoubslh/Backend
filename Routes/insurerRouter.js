const express = require('express');
const insurerController = require('./../controllers/insurerController');
const authController = require('./../authControllers/authController')

const Router = express.Router({ mergeParams: true });
console.log('After');
Router.route('/').get(insurerController.getInsurer).post(insurerController.creatInsurer);
console.log('After');
Router.route('/plan').post(insurerController.creatPlan).get(insurerController.getPlan)
Router.route('/plan/:planId').post()
module.exports = Router
