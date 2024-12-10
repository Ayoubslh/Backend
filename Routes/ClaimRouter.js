const express =require('express');
const claimController=require('./../controllers/claimController');
const authController=require('./../authControllers/authController')

const Router=express.Router();

Router.route('/').get(claimController.getAllClaims).post(claimController.newClaim);
Router.route('/:id').get(claimController.getAUserClaim)
Router.route('/:id/accepted').put(claimController.AcceptsClaims)
Router.route('/:id/rejected').put(claimController.AcceptsClaims)





module.exports=Router;