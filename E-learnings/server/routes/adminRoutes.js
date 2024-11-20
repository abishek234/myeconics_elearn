const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/admin', adminController.createAdmin);
router.get('/admin', adminController.getAllAdmins);
router.get('/admin/:id', adminController.getAdminById);
router.put('/admin/:id', adminController.updateAdmin);
router.delete('/admin/:id', adminController.deleteAdmin);
router.get('/admin/school/:adminId', adminController.getDetailsBySchool);
router.get('/admin/managers/subject/:firstname/:lastname', adminController.getSubjectsByManager);
router.get('/admin/chapters/:firstname/:lastname/:subject', adminController.getChaptersByManager);
router.get('/admin/topics/:firstname/:lastname/:subject/:chapter', adminController.getTopicsByManager);
router.get('/admin/videos/:firstname/:lastname/:subject/:chapter/:topic', adminController.getVideosByManager);


module.exports = router;