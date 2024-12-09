const express =require('express');
const claimController=require('./../controllers/claimController');

const Router=express.Router();

Router.route('/').get(claimController.getAllClaims).post(claimController.newClaim);
Router.route('/:phone');






module.exports=Router;