const express = require('express');
const router = express.Router();
const managerController = require('../controllers/managerController');

router.post('/manager', managerController.createManager);
router.get('/managers', managerController.getAllManagers);
router.get('/manager/:id', managerController.getManagerById);
router.get('/manager', managerController.getManagersBySchool);
router.put('/manager/:id', managerController.updateManager);
router.delete('/manager/:id', managerController.deleteManager);
router.get('/manager/employees/:managerId', managerController.getEmployeesByClassAndManager);
router.get('/manager/class/employees',managerController.getEmployeesByManagerClass)

module.exports = router;