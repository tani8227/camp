const express= require('express');
const router= express.Router();
const passport= require('../config/passport_local')
const stdController= require('../controllers/students_record_controller')

router.post('/create', stdController.create);
router.get('/destroy', passport.checkAuthentication, stdController.destroy);










module.exports= router;