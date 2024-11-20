const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.post('/employee', employeeController.createEmployee);
router.get('/employees', employeeController.getAllEmployees);
router.get('/employee',employeeController.getEmployeesBySchoolClass)
router.get('/employee/school',employeeController.getEmployeesBySchool)
router.get('/employee/:id', employeeController.getEmployeeById);
router.put('/employee/:id', employeeController.updateEmployee);
router.delete('/employee/:id', employeeController.deleteEmployee);

module.exports = router;