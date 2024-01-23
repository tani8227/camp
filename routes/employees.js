const express= require('express');
const router = express.Router();
const passport= require('../config/passport_local')
const employController= require('../controllers/employee_controller')

router.get('/profile',passport.checkAuthentication, employController.profile);
router.get('/signup', employController.signUp);
router.get('/signin', employController.signIn);
router.post('/create', employController.create);
router.post('/session',passport.authenticate(
     'local',
     {
        failureRedirect:'employees/signin',
     }
    ), employController.createSession);
    
router.get('/destroySession', employController.destroySession);




module.exports=router;