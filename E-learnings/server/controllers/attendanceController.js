const Attendance = require('../models/Attendance');

// Mark attendance by getting Employees' roll numbers which attendance is marked by the manager for the particular period
exports.markAttendance = async (req, res) => {
    try {
        const { classId, date, periods } = req.body;

        // Create attendance record
        const attendanceRecord = {
            classId,
            date,
            periods: periods.map(period => ({
                periodNumber: period.periodNumber,
                subject: period.subject,
                presentEmployees: period.presentEmployees, // Array of roll numbers for present employees
                absentEmployees: period.absentEmployees // Array of roll numbers for absent employees
            }))
        };

        // Save the attendance record to the database
        await Attendance.create(attendanceRecord); // Use create to insert a single document

        res.status(201).json({ message: 'Attendance marked successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//Get attendance percentage of a employee for a particular date
exports.getEmployeeAttendancePercentage = async (req, res) => {
    try {
        const { employeeId, startDate, endDate } = req.query;
        

        const attendanceRecords = await Attendance.aggregate([
            {
                $match: {
                    date: { $gte: new Date(startDate), $lte: new Date(endDate) },
                },
            },
            {
                $unwind: "$periods", // Deconstruct periods array
            },
            {
                $project: {
                    presentCount: {
                        $cond: [
                            { $in: [employeeId, "$periods.presentEmployees"] }, // Check if employeeId is present
                            1,
                            0,
                        ],
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    totalPeriods: { $sum: 1 }, // Count total periods
                    presentCount: { $sum: "$presentCount" }, // Sum present counts
                },
            },
        ]);

        const totalPeriods = attendanceRecords.length > 0 ? attendanceRecords[0].totalPeriods : 0;
        const presentCount = attendanceRecords.length > 0 ? attendanceRecords[0].presentCount : 0;

        const percentage = totalPeriods > 0 ? (presentCount / totalPeriods) * 100 : 0;

        res.status(200).json({ percentage });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get attendance of all employees for a particular date
exports.getAttendanceByDate = async (req, res) => {
    try {
        const { date } = req.query;
        const attendance = await Attendance.find({ date });
        res.status(200).json(attendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get overall attendance for a employee for a day with respect to the total periods
exports.getEmployeeOverallAttendanceByDate = async (req, res) => {
    try {
        const { employeeId, date } = req.query;
        const attendance = await Attendance.findOne({ employeeId, date });
        let presentCount = 0;
        let absentCount = 0;
        attendance.periods.forEach((period) => {
            if (period.status === 'present') {
                presentCount++;
            } else {
                absentCount++;
            }
        });
        res.status(200).json({ presentCount, absentCount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get overall attendance for a day with respect to the total period
exports.getOverallAttendanceByDate = async (req, res) => {
    try {
        const { date } = req.query;
        const attendance = await Attendance.find({ date });
        let presentCount = 0;
        let absentCount = 0;
        attendance.forEach((employee) => {
            employee.periods.forEach((period) => {
                if (period.status === 'present') {
                    presentCount++;
                } else {
                    absentCount++;
                }
            });
        });
        res.status(200).json({ presentCount, absentCount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Get overall attendance for a employee in a month/year
exports.getEmployeeAttendanceByMonth = async (req, res) => {
    try {
        const { employeeId, month, year } = req.query;
        const attendance = await Attendance.find({ employeeId });
        let presentCount = 0;
        let absentCount = 0;
        attendance.forEach((employee) => {
            if (employee.date.getMonth() === month && employee.date.getFullYear() === year) {
                employee.periods.forEach((period) => {
                    if (period.status === 'present') {
                        presentCount++;
                    } else {
                        absentCount++;
                    }
                });
            }
        });
        res.status(200).json({ presentCount, absentCount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get overall attendance for a employee in a year
exports.getEmployeeAttendanceByYear = async (req, res) => {
    try {
        const { employeeId, year } = req.query;
        const attendance = await Attendance.find({ employeeId });
        let presentCount = 0;
        let absentCount = 0;
        attendance.forEach((employee) => {
            if (employee.date.getFullYear() === year) {
                employee.periods.forEach((period) => {
                    if (period.status === 'present') {
                        presentCount++;
                    } else {
                        absentCount++;
                    }
                });
            }
        });
        res.status(200).json({ presentCount, absentCount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

