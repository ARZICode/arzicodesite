const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/login', authController.login);
router.get('/verify', authMiddleware, (req, res) => {
  res.json({ valid: true, admin: req.admin });
});

router.use(authMiddleware);

router.get('/services', adminController.getAllServices);
router.post('/services', upload.single('image'), adminController.addService);
router.put('/services/:id', upload.single('image'), adminController.editService);
router.delete('/services/:id', adminController.deleteService);

router.get('/reviews', adminController.getAllReviews);
router.post('/reviews', adminController.addReview);
router.put('/reviews/:id', adminController.editReview);
router.delete('/reviews/:id', adminController.deleteReview);

router.get('/case-studies', adminController.getAllCaseStudies);
router.post('/case-studies', upload.single('image'), adminController.addCaseStudy);
router.put('/case-studies/:id', upload.single('image'), adminController.editCaseStudy);
router.delete('/case-studies/:id', adminController.deleteCaseStudy);

module.exports = router;