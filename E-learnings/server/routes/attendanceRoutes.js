const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

// Route to mark attendance
router.post('/attendance', attendanceController.markAttendance);

// Route to get attendance percentage for a employee
router.get('/attendance/percentage', attendanceController.getEmployeeAttendancePercentage);

// Route to get attendance of all employees for a particular date
router.get('/attendance/date', attendanceController.getAttendanceByDate);

// Route to get overall attendance for a employee for a specific date
router.get('/attendance/employee/date', attendanceController.getEmployeeOverallAttendanceByDate);

// Route to get overall attendance for all employees on a specific date
router.get('/attendance/overall/date', attendanceController.getOverallAttendanceByDate);

// Route to get overall attendance for a employee in a month
router.get('/attendance/employee/month', attendanceController.getEmployeeAttendanceByMonth);

// Route to get overall attendance for a employee in a year
router.get('/attendance/employee/year', attendanceController.getEmployeeAttendanceByYear);

module.exports = router;