const express =require('express');
const claimController=require('./../controllers/claimController');

const Router=express.Router();

Router.route('/').get(claimController.getAllClaims).post(claimController.newClaim);
Router.route('/:id').get(claimController.getAUserClaim)
Router.route('/:id/accepted').put()






module.exports=Router;