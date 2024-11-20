import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Sidebar from './Sidebar';
import { toast } from 'react-toastify';
import Select from 'react-select';
import "../CSS/Dashboard.css";

const AdminTracking = ({ userId }) => {
    const [teachers, setManagers] = useState([]);
    const [selectedManager, setSelectedManager] = useState(null);
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
        const fetchManagers = async () => {
            const adminSchoolName = localStorage.getItem('userschool');
            try {
                const response = await axios.get(`http://localhost:9000/api/managers/manager?schoolname=${adminSchoolName}`);
                const teacherOptions = response.data.map(t => ({ label: `${t.firstname} ${t.lastname}`, value: t._id }));
                setManagers(teacherOptions);
                // Optionally set the first manager as default
                if (teacherOptions.length > 0) {
                    setSelectedManager(teacherOptions[0]);
                }
            } catch (err) {
                console.error('Error fetching Managers:', err);
                toast.error('Failed to fetch Managers. Please try again.');
            }
        };

        fetchManagers();
    }, []);

    // Fetch subjects whenever selectedManager changes
    useEffect(() => {
        if (selectedManager) {
            handleFetchSubjects();
        }
    }, [selectedManager]);

    // Fetch subjects for the selected manager
    const handleFetchSubjects = async () => {
        if (!selectedManager) {
            toast.error('Please select a manager.');
            return;
        }

        try {
            console.log("Fetching subjects for:", selectedManager.label);
            const response = await axios.get(`http://localhost:9000/api/admins/admin/managers/subject/${selectedManager.label.split(' ')[0]}/${selectedManager.label.split(' ')[1]}`);
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
        if (!selectedManager || !selectedSubject) {
            toast.error('Please select a manager and a subject.');
            return;
        }

        try {
            console.log("Fetching chapters for:", selectedSubject.value);
            const response = await axios.get(`http://localhost:9000/api/admins/admin/chapters/${selectedManager.label.split(' ')[0]}/${selectedManager.label.split(' ')[1]}/${selectedSubject.value}`);
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
        if (!selectedChapter.value || !selectedSubject || !selectedManager) {
            toast.error('Please select a chapter.');
            return;
        }

        try {
            console.log("Fetching topics for:", selectedChapter.value); // Debugging log
            const response = await axios.get(`http://localhost:9000/api/admins/admin/topics/${selectedManager.label.split(' ')[0]}/${selectedManager.label.split(' ')[1]}/${selectedSubject.value}/${selectedChapter.value}`);
            
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
        if (!selectedTopic.value || !selectedChapter || !selectedSubject || !selectedManager) {
            toast.error('Please select a topic.');
            return;
        }
        
        try {
            console.log("Fetching videos for:", selectedTopic.value);
            const response = await axios.get(`http://localhost:9000/api/admins/admin/videos/${selectedManager.label.split(' ')[0]}/${selectedManager.label.split(' ')[1]}/${selectedSubject.value}/${selectedChapter.value}/${selectedTopic.value}`);
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
                <h1>Track Videos by manager</h1>

                {/* manager Selection */}
                <div className="form-group">
                    <Select
                        options={teachers}
                        value={selectedManager}
                        onChange={(option) => {
                            setSelectedManager(option);
                        }}
                        placeholder="Select a manager"
                    />
                </div>

                {/* Subject Selection */}
                {selectedManager && (
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