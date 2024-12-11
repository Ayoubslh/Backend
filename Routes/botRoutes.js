const express = require('express');
const botController=require('../controllers/analyser')
const { AuthMid } = require('../middleware/auth');

const router = express.Router();

router.post('/pictureanalyse',botController.generate);
router.post('/chatbot',botController.textgeneration);
module.exports = router
