    const manager = require('../models/Manager'); // Adjust the path as necessary
    const Employee = require('../models/Employee');
    const Video = require('../models/Video');

    // Create a new manager
    exports.createManager = async (req, res) => {
        try {
            const managers = new manager(req.body);
            await managers.save();
            res.status(201).json(managers);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    // Get all teachers based on the school name
    exports.getAllManagers = async (req, res) => {
        try {
            const teachers = await manager.find() || []; ;
            res.status(200).json(teachers);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    // Get employees based on the manager's handling class
    exports.getEmployeesByManagerClass = async (req, res) => {
        try {
            
            const {classid,schoolname} = req.query
           
    
            // Fetch employees based on the classid
            const employees = await Employee.find({classid: classid,schoolname:schoolname});
            
            // Return employees or a message if none found
            if (employees.length === 0) {
                return res.status(404).json({ message: "No employees found for this class." });
            }
    
            res.status(200).json(employees);
        } catch (error) {
            console.error(error); // Log the error for debugging
            res.status(500).json({ message: error.message });
        }
    };

    // Get a single manager by ID
    exports.getManagerById = async (req, res) => {
        try {
            const managers = await manager.findById(req.params.id);
            console.log(managers);
            if (!managers) return res.status(404).json({ message: 'manager not found' });
            res.status(200).json(managers);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    exports.getManagersBySchool = async (req, res) => {
        try {
            const schoolName = req.query.schoolname; // Ensure this matches the query parameter used in the frontend
          
            const teachers = await manager.find({ schoolname: schoolName });
            res.status(200).json(teachers);
        } catch (error) {
            console.error('Error fetching teachers:', error.message); // Log the error message
            res.status(500).json({ message: error.message });
        }
    };
    // Update a manager
    exports.updateManager = async (req, res) => {
        try {
            const managers = await manager.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!managers) return res.status(404).json({ message: 'manager not found' });
            res.status(200).json(managers);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    // Delete a manager
    exports.deleteManager = async (req, res) => {
        try {
            const managers = await manager.findByIdAndDelete(req.params.id);
            if (!managers) return res.status(404).json({ message: 'manager not found' });
            res.status(204).json();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };


// Get employee details based on manager handling class
exports.getEmployeesByClassAndManager = async (req, res) => {
    const { teacherId } = req.params;
    
    

    try {
        // Find the manager to get the handling class
        const managers = await manager.findById(teacherId);

        if (!managers) {
            return res.status(404).json({ message: 'manager not found' });
        }

        const handlingClass = managers.handlingclass;
        const designation = managers.designation; 
        const schoolname = managers.schoolname;

        // Fetch all employees in that class
        const employees = await Employee.find({ classid: handlingClass,schoolname:schoolname});

        // Initialize counts
        const totalEmployees = employees.length;
        const boysCount = employees.filter(employee => employee.gender === 'Male').length;
        const girlsCount = employees.filter(employee => employee.gender === 'Female').length;
        

        // Fetch all videos for that class
        const videos = await Video.find({ class: handlingClass });
       

        // Trim whitespace from designation and log it
        const trimmedDesignation = designation.trim();
        

        // Fetch videos by subject (designation)
        const videosBySubject = await Video.find({ subject: trimmedDesignation,teacherId:teacherId });
        

        // Calculate video completion stats for all videos in class
        const completedVideosCount = await Promise.all(videosBySubject.map(async (video) => {
            return video.completedBy.length; // Count how many employees have completed this video
        }));

        const totalCompletedVideos = completedVideosCount.reduce((acc, count) => acc + count, 0);
        
        // Calculate total not completed videos
        const totalNotCompletedVideos = (totalEmployees * videosBySubject.length) - totalCompletedVideos;

        // Prepare response data
        const responseData = {
            totalEmployees,
            boysCount,
            girlsCount,
            totalVideos: videosBySubject.length,  // Total number of videos by subject
            totalChapters: new Set(videosBySubject.map(video => video.chapter)).size , // Unique chapters from fetched videos by subject
            totalCompletedVideos,
            totalNotCompletedVideos,
          
        };

        res.json(responseData);
    } catch (error) {
        console.error('Error fetching employee details:', error);
        res.status(500).json({ error: 'Failed to fetch employee details' });
    }
};


