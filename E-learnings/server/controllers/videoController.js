const mongoose = require('mongoose');
const Video = require('../models/Video');
const manager = require('../models/Manager');
const Assessment = require('../models/Assessment'); 
const Employee = require('../models/Employee');

// Add a new video
exports.createVideo = async (req, res) => {
    try {
        const video = new Video(req.body);
        await video.save();
        res.status(201).json(video);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


//get Subjects by class
exports.getSubjectsByClass = async (req, res) => {
    try {
        const className = req.params.class;
        const subjects = await Video.find({ class: className }).distinct('subject');
        res.status(200).json(subjects);
    } catch (error) {
        console.error('Error fetching subjects:', error.message); 
        res.status(500).json({ message: error.message });
    }
}

//Get Videos for a Specfic Topic
exports.getVideosByTopic = async (req, res) => {
    try {
        const { class: className, subject, chapter, topic } = req.params;
        const videos = await Video.find({ class: className, subject, chapter, topic }).select('videoId materialId form');
        res.status(200).json(videos);
    } catch (error) {
        console.error('Error fetching videos:', error.message);
        res.status(500).json({ message: error.message });
    }
};

// Get topics for a specific chapter in a specific subject and class
exports.getTopicsByChapter = async (req, res) => {
    try {
        const { class: className, subject, chapter } = req.params;
        const topics = await Video.find({ class: className, subject, chapter });

        const distinctTopics = [...new Set(topics.map(video => video.topic))]; // Get distinct topics

        // Fetch completion status for each topic
        const completedStatusPromises = distinctTopics.map(async (topic) => {
            const completedVideos = await Video.find({
                class: className,
                subject,
                chapter,
                topic
            }).select('completedBy');

           
            const userId = new mongoose.Types.ObjectId(req.params.id); 
            const user = await Employee.findById(userId);
            const userEmail = user.email;

            const isCompleted = completedVideos.some(video => video.completedBy.includes(userEmail));

            return { topic, isCompleted };
        });

        const completionStatus = await Promise.all(completedStatusPromises);

        res.status(200).json(completionStatus);
    } catch (error) {
        console.error('Error fetching topics:', error.message); 
        res.status(500).json({ message: error.message });
    }
};

// Get chapters for a specific subject in a specific class
exports.getChaptersBySubject = async (req, res) => {
    try {
         
        const { class: className,subject } = req.params;
        const chapters = await Video.find({ class: className, subject });
      
        const distinctChapters = [...new Set(chapters.map(video => video.chapter))]; // Get distinct chapters manually
        res.status(200).json(distinctChapters);
    } catch (error) {
        console.error('Error fetching Chapters:', error.message); 
        res.status(500).json({ message: error.message });
    }
}

// Get video IDs for a specific chapter in a specific subject and class
exports.getVideosByChapter = async (req, res) => {
    try {
        const { class: className, subject, chapter } = req.params;
        const videos = await Video.find({ class: className, subject, chapter }).select('videoId materialId');
        res.status(200).json(videos);
    } catch (error) {
        console.error('Error fetching videos:', error.message); 
        res.status(500).json({ message: error.message });
    }
}


//get video by teacherobjectID
exports.getVideosByManager = async (req, res) => {
    try {
        const teacherID = new mongoose.Types.ObjectId(req.params.id);
        const videos = await Video.find({ teacherId : teacherID });
        res.status(200).json(videos);
    } catch (error) {
        console.error('Error fetching videos:', error.message); 
        res.status(500).json({ message: error.message });
    }
}

//edit video report
exports.updateVideo = async (req, res) => {
    try {
        const videoId = req.params.id;
        const updatedVideo = await Video.findByIdAndUpdate(videoId, req.body, { new: true });
        if (!updatedVideo) return res.status(404).json({ message: 'Video not found' });
        res.status(200).json(updatedVideo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//delete video
exports.deleteVideo = async (req, res) => {
    try {
        const videoId = req.params.id;
        const deletedVideo = await Video.findByIdAndDelete(videoId);
        if (!deletedVideo) return res.status(404).json({ message: 'Video not found' });
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: error.message });

    
    }
} 

exports.markVideoAsCompleted = async (req, res) => {
    try {
        const videoId = req.params.id;
        const userId = req.body.userId; // Get the userId from the request body

        // Find the video
        const video = await Video.findById(videoId);
        if (!video) return res.status(404).json({ message: 'Video not found' });

        // Get user email from userId (assuming you have a User model)
        const user = await Employee.findById(userId); // Assuming you have a User model
        if (!user) return res.status(404).json({ message: 'User not found' });

        const userEmail = user.email; // Get the user's email

        // Fetch assessments for this user
        const assessments = await Assessment.find({
            email: userEmail,
            class: video.class, // Assuming the video has a class property
            subject: video.subject, // Assuming the video has a subject property
            chapter: video.chapter, // Assuming the video has a chapter property
            topic: video.topic // Assuming the video has a topic property
        });

        // Check if any assessments were found
        if (assessments.length > 0) {
            // Check if the user has already marked it as completed
            if (!video.completedBy.includes(userEmail)) {
                video.completedBy.push(userEmail); // Add the user's email to completedBy array
                await video.save(); // Save the updated video
                console.log(video);
                return res.json(video); // Return the updated video
            } else {
                return res.status(200).json({ message: 'Video already marked as completed.' });
            }
        } else {
            return res.status(403).json({ message: 'User does not have access to this assessment.' });
        }
    } catch (error) {
        console.error("Error marking video as completed:", error);
        res.status(400).json({ message: error.message });
    }
};

//get video completed by the specific employee
exports.getCompletedVideos = async (req, res) => {
    try {
      const {videoId, userId} = req.params;
      const user = await Employee.findById(userId); // Assuming you have a User model
      if (!user) return res.status(404).json({ message: 'User not found' });
      const userEmail = user.email
      
      const video = await Video.findById(videoId);
      if (!video) return res.status(404).json({ message: 'Video not found' });
      const isCompleted = video.completedBy.includes(userEmail);
  
      res.json({ isCompleted });
    } catch (error) {
      console.error('Error checking video completion:', error);
      res.status(500).json({ error: 'Failed to check video completion' });
    }
  };



// Get videos by manager's first and last name
exports.getVideosByManagerName = async (req, res) => {
    try {
        const { firstName, lastName } = req.params; // Destructure firstName and lastName from params

        // Find the manager by first name and last name
        const manager = await manager.findOne({
            firstname: firstName,
            lastname: lastName
        });

        if (!manager) {
            return res.status(404).json({ message: 'manager not found' });
        }

        // Fetch videos associated with the found manager
        const videos = await Video.find({ teacherId: manager._id }).populate('teacherId', 'firstname lastname');

        res.status(200).json(videos);
    } catch (error) {
        console.error('Error fetching videos:', error.message);
        res.status(500).json({ message: error.message });
    }
};


