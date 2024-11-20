const express =  require('express');
const router = express.Router();
const timetableController = require('../controllers/timetableController');

// Add timetable for a manager
router.post('/addtimetable', timetableController.createTimetable);

// Get timetable by manager
router.get('/gettimetable/:firstname/:lastname', timetableController.getTimetableByManager);

// Get overall periods for a day based on class
router.get('/getperiods/:classId', timetableController.getPeriodsByClass);

module.exports = router;