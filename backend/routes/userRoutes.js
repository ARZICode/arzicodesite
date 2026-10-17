const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/services', userController.getPublicServices);
router.get('/services/:id', userController.getPublicServiceById);
router.get('/reviews', userController.getPublicReviews);
router.get('/case-studies', userController.getPublicCaseStudies);

module.exports = router;