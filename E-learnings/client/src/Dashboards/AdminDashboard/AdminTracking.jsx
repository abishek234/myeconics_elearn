import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Sidebar from './Sidebar';
import { toast } from 'react-toastify';
import Select from 'react-select';
import "../CSS/Dashboard.css";

const AdminTracking = ({ userId }) => {
    const [teachers, setTeachers] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [chapters, setChapters] = useState([]);
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState(null);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    // Fetch all teachers when the component mounts
    useEffect(() => {
        const fetchTeachers = async () => {
            const adminSchoolName = localStorage.getItem('userschool');
            try {
                const response = await axios.get(`http://localhost:9000/api/teachers/teacher?schoolname=${adminSchoolName}`);
                const teacherOptions = response.data.map(t => ({ label: `${t.firstname} ${t.lastname}`, value: t._id }));
                setTeachers(teacherOptions);
                // Optionally set the first teacher as default
                if (teacherOptions.length > 0) {
                    setSelectedTeacher(teacherOptions[0]);
                }
            } catch (err) {
                console.error('Error fetching teachers:', err);
                toast.error('Failed to fetch teachers. Please try again.');
            }
        };

        fetchTeachers();
    }, []);

    // Fetch subjects whenever selectedTeacher changes
    useEffect(() => {
        if (selectedTeacher) {
            handleFetchSubjects();
        }
    }, [selectedTeacher]);

    // Fetch subjects for the selected teacher
    const handleFetchSubjects = async () => {
        if (!selectedTeacher) {
            toast.error('Please select a teacher.');
            return;
        }

        try {
            console.log("Fetching subjects for:", selectedTeacher.label);
            const response = await axios.get(`http://localhost:9000/api/admins/admin/teachers/subject/${selectedTeacher.label.split(' ')[0]}/${selectedTeacher.label.split(' ')[1]}`);
            console.log(response.data);
            setSubjects(response.data);
            setSelectedSubject(null);
            setChapters([]);
            setSelectedChapter(null);
            setTopics([]);
            setSelectedTopic(null);
        } catch (err) {
            console.error('Error fetching subjects:', err);
            toast.error('Failed to fetch subjects. Please try again.');
        }
    };

    // Fetch chapters for the selected subject
    useEffect(() => {
        if (selectedSubject) {
            handleFetchChapters();
        }
    }, [selectedSubject]);

    const handleFetchChapters = async () => {
        if (!selectedTeacher || !selectedSubject) {
            toast.error('Please select a teacher and a subject.');
            return;
        }

        try {
            console.log("Fetching chapters for:", selectedSubject.value);
            const response = await axios.get(`http://localhost:9000/api/admins/admin/chapters/${selectedTeacher.label.split(' ')[0]}/${selectedTeacher.label.split(' ')[1]}/${selectedSubject.value}`);
            console.log(response.data);
            setChapters(response.data);
            setSelectedChapter(null);
            setTopics([]);
            setSelectedTopic(null);
        } catch (err) {
            console.error('Error fetching chapters:', err);
            toast.error('Failed to fetch chapters. Please try again.');
        }
    };

    // Fetch topics for the selected chapter
    useEffect(() => {
        if (selectedChapter) {
            handleFetchTopics();
        }
    }, [selectedChapter]);

    const handleFetchTopics = async () => {
        if (!selectedChapter.value || !selectedSubject || !selectedTeacher) {
            toast.error('Please select a chapter.');
            return;
        }

        try {
            console.log("Fetching topics for:", selectedChapter.value); // Debugging log
            const response = await axios.get(`http://localhost:9000/api/admins/admin/topics/${selectedTeacher.label.split(' ')[0]}/${selectedTeacher.label.split(' ')[1]}/${selectedSubject.value}/${selectedChapter.value}`);
            
            console.log("Fetched Topics:", response.data); // Log fetched topics

            setTopics(response.data); // Set formatted topics
            setSelectedTopic(null); // Reset selected topic
            setVideos([]); // Reset videos
            
        } catch (err) {
            console.error('Error fetching topics:', err);
            toast.error('Failed to fetch topics. Please try again.');
        }
    };

    const handleFetchVideos = async () => {
        // Ensure selectedTopic is valid and has a value
        if (!selectedTopic.value || !selectedChapter || !selectedSubject || !selectedTeacher) {
            toast.error('Please select a topic.');
            return;
        }
        
        try {
            console.log("Fetching videos for:", selectedTopic.value);
            const response = await axios.get(`http://localhost:9000/api/admins/admin/videos/${selectedTeacher.label.split(' ')[0]}/${selectedTeacher.label.split(' ')[1]}/${selectedSubject.value}/${selectedChapter.value}/${selectedTopic.value}`);
            console.log("Fetched Videos:", response.data);
    
            // Parse the response data
            const { VideoIds, Materials } = response.data;
    
            if (!Array.isArray(VideoIds) || !Array.isArray(Materials)) {
                throw new Error('Invalid API response format');
            }
    
            const parsedVideos = VideoIds.map((videoId, index) => ({
                _id: `${selectedTopic.value}-${index}`,
                subject: selectedSubject.value,
                chapter: selectedChapter.value,
                videoId: videoId,
                materialId: Materials[index]
            }));
    
            setVideos(parsedVideos);
            setError(null);
        } catch (err) {
            console.error('Error fetching videos:', err);
            toast.error('Failed to fetch videos. Please try again.');
        }
    };

    const getEmbeddableLink = (link) => {
        const regex = /\/d\/([a-zA-Z0-9_-]+)/;
        const match = link.match(regex);
        return match ? `https://drive.google.com/file/d/${match[1]}/preview` : link; // Return embeddable link or original if not found
    };
    

    return (
        <div className="app-layout">
            <Header onToggleSidebar={toggleSidebar} userId={userId} />
            <Sidebar isOpen={isSidebarOpen} />
            <main className="main-content">
                <h1>Track Videos by Teacher</h1>

                {/* Teacher Selection */}
                <div className="form-group">
                    <Select
                        options={teachers}
                        value={selectedTeacher}
                        onChange={(option) => {
                            setSelectedTeacher(option);
                        }}
                        placeholder="Select a teacher"
                    />
                </div>

                {/* Subject Selection */}
                {selectedTeacher && (
                    <div className="form-group">
                        <Select
                            options={subjects.map(subject => ({ label: subject.title || subject, value: subject._id || subject }))}
                            value={selectedSubject}
                            onChange={(option) => {
                                setSelectedSubject(option);
                                console.log("Selected Subject:", option); // Debugging log
                            }}
                            placeholder="Select a subject"
                        />
                    </div>
                )}

                {/* Chapter Selection */}
                {selectedSubject && (
                    <div className="form-group">
                        <Select
                            options={chapters.map(chapter => ({ label: chapter.title || chapter, value: chapter._id || chapter }))} 
                            value={selectedChapter}
                            onChange={(option) => {
                                setSelectedChapter(option);
                                console.log("Selected Chapter:", option); // Debugging log
                            }}
                            placeholder="Select a chapter"
                        />
                    </div>
                )}

                {/* Topic Selection */}
{selectedChapter && (
    <div className="form-group">
        <Select
            options={topics.map(topic => ({ label: topic.title || topic, value: topic._id || topic }))} 
            value={selectedTopic}
            onChange={(option) => {
                setSelectedTopic(option);
                console.log("Selected Topic:", option); // Debugging log
                if (option) {
                    handleFetchVideos();  // Fetch videos when a topic is selected
                }
            }}
            placeholder="Select a topic"
        />
    </div>
)}  

                {/* Fetch Videos Button */}
                {selectedTopic && (
                    <button onClick={handleFetchVideos} className="btn-download">Fetch Videos</button>
                )}

                {error && <p className="error">{error}</p>}

                {videos.length > 0 && (
    <div className="video-list">
        
        <ul>
            {videos.map((video) => (
                <li key={video._id}>
                    <h2>Video Uploaded for {video.subject} - {video.chapter}</h2>
                    <h3>{selectedTopic?.label}</h3>
                    <h4>VIDEO:</h4>
                    <iframe
                        width="560"
                        height="315"
                        src={video.videoId}
                        title={`Video ${video._id}`}
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                    <h4>MATERIAL:</h4>
                    <iframe 
                        width="560" 
                        height="315" 
                        src={getEmbeddableLink(video.materialId)}
                        title={`Material for ${video._id}`} 
                        frameBorder="0" 
                        allowFullScreen 
                    ></iframe>
                </li>
            ))}
        </ul>
    </div>
)}
        
            </main>
        </div>
    );
};

export default AdminTracking;