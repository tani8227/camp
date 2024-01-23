const express = require('express');
const router =express.Router();
const homeController= require('../controllers/home_controller')


router.get('/', homeController.home); 
router.get('/download-csv', homeController.downloadCSV);
router.use('/employees', require('./employees'))
router.use('/students', require('./stdrecords'))
router.use('/interview', require('./interviews'))





module.exports= router;