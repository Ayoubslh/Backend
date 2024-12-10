const express = require('express');
const claimController = require('./../controllers/claimController');
const authController = require('./../authControllers/authController');
const { AuthMid } = require('../middleware/auth');

const router = express.Router();


router.route('/').get(claimController.getAllClaims).post(claimController.newClaim);
router.route('/:id').get(claimController.getAUserClaim)
router.route('/:id/accepted').put(claimController.AcceptsClaims)
router.route('/:id/rejected').put(claimController.AcceptsClaims)





module.exports = router;