
const express = require('express');
const router = express.Router();

const interviewController= require('../controllers/interview_controller');
const passport = require('passport');





router.get('/page', passport.checkAuthentication ,interviewController.interviewpage)
router.post('/create', passport.checkAuthentication , interviewController.create);
router.post('/markresult', interviewController.markinterviewresult);




module.exports=router;